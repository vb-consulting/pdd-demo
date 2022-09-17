// pgroutiner auto-generated code
global using System;
global using System.Linq;
global using System.Collections.Generic;
global using System.Threading.Tasks;
global using Xunit;
global using Norm;
global using FluentAssertions;
global using PDD.Database.Extensions;
global using PDD.Database.Models;
global using Newtonsoft.Json;
global using Newtonsoft.Json.Linq;
using System.IO;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace PDD.DatabaseTests;

public class Config
{
    public string TestConnection { get; set; }
    public string ConfigPath { get; set; }
    public string TestDatabaseName { get; set; }
    public bool TestDatabaseFromTemplate { get; set; }
    public List<string> UpScripts { get; set; } = new();
    public List<string> DownScripts { get; set; } = new();
    public bool UnitTestsUnderTransaction { get; set; }
    public bool UnitTestsNewDatabaseFromTemplate { get; set; }

    public static Config Value { get; }
    public static string ConnectionString { get; }

    static Config()
    {
        Value = new Config();
        var config = new ConfigurationBuilder().AddJsonFile("testsettings.json", false, false).Build();
        config.GetSection("TestSettings").Bind(Value);
        if (Value.TestDatabaseFromTemplate && Value.UnitTestsNewDatabaseFromTemplate)
        {
            throw new ArgumentException(@"Configuration settings TestDatabaseFromTemplate=true and UnitTestsNewDatabaseFromTemplate=true doesn't make any sense.
There is no point of creating a test database from a template and to do that again for each unit test.
Set one of TestDatabaseFromTemplate or UnitTestsNewDatabaseFromTemplate to false.");
        }
        if (Value.UnitTestsNewDatabaseFromTemplate && Value.UnitTestsUnderTransaction)
        {
            throw new ArgumentException(@"Configuration settings UnitTestsNewDatabaseFromTemplate=true and UnitTestsUnderTransaction=true doesn't make any sense.
There is no point of creating a new test database from a template for each test and then use transaction on a database where only one test runs.
Set one of UnitTestsNewDatabaseFromTemplate or UnitTestsUnderTransaction to false.");
        }
        if (Value.UnitTestsNewDatabaseFromTemplate && (Value.UpScripts.Any() || Value.DownScripts.Any()))
        {
            throw new ArgumentException(@"Configuration settings UnitTestsNewDatabaseFromTemplate=true and up or down scripts (UpScripts, DownScripts) doesn't make any sense.
Up or down scripts are only applied on a test database created for all tests.
Set one of UnitTestsNewDatabaseFromTemplate or clear UpScripts and DownScripts.");
        }
        string externalConnectionString = null;
        if (Value.ConfigPath != null && File.Exists(Value.ConfigPath))
        {
            var external = new ConfigurationBuilder().AddJsonFile(Path.Join(Directory.GetCurrentDirectory(), Value.ConfigPath), false, false).Build();
            externalConnectionString = external.GetConnectionString(Value.TestConnection);
        }
        ConnectionString = config.GetConnectionString(Value.TestConnection) ?? externalConnectionString;
    }
}

public sealed class PostgreSqlUnitTests : IDisposable
{
    public NpgsqlConnection Connection { get; }

    public PostgreSqlUnitTests()
    {
        Connection = new NpgsqlConnection(Config.ConnectionString);
        CreateTestDatabase(Connection);
        Connection.ChangeDatabase(Config.Value.TestDatabaseName);
        ApplyMigrations(Connection, Config.Value.UpScripts);
    }

    public void Dispose()
    {
        ApplyMigrations(Connection, Config.Value.DownScripts);
        Connection.Close();
        Connection.Dispose();
        using var connection = new NpgsqlConnection(Config.ConnectionString);
        DropTestDatabase(connection);
    }

    public static void CreateDatabase(NpgsqlConnection connection, string database, string template = null)
    {
        void DoCreate() => connection.Execute($"create database {database}{(template == null ? "" : $" template {template}")}");
        if (template != null)
        {
            connection.Execute(RevokeUsersCmd(template));
        }
        try
        {
            DoCreate();
        }
        catch (PostgresException e)
        when (e.SqlState == "42P04") // 42P04=duplicate_database, see https://www.postgresql.org/docs/9.3/errcodes-appendix.html
        {
            DropDatabase(connection, database);
            DoCreate();
        }
    }

    public static void DropDatabase(NpgsqlConnection connection, string database)
    {
        connection.Execute($@"
        {RevokeUsersCmd(database)}
        drop database {database};");
    }

    private static void CreateTestDatabase(NpgsqlConnection connection)
    {
        if (Config.Value.TestDatabaseFromTemplate)
        {
            CreateDatabase(connection, Config.Value.TestDatabaseName, connection.Database);
        }
        else
        {
            CreateDatabase(connection, Config.Value.TestDatabaseName);
        }
    }

    private static void DropTestDatabase(NpgsqlConnection connection)
    {
        DropDatabase(connection, Config.Value.TestDatabaseName);
    }

    private static void ApplyMigrations(NpgsqlConnection connection, List<string> scriptPaths)
    {
        foreach (var path in scriptPaths)
        {
            connection.Execute(File.ReadAllText(path));
        }
    }

    private static string RevokeUsersCmd(string database)
    {
        return $@"
        revoke connect on database {database} from public;
        select pg_terminate_backend(pid) from pg_stat_activity where datname = '{database}' and pid <> pg_backend_pid();
        ";
    }
}

[CollectionDefinition("PostgreSqlDatabase")]
public class DatabaseFixtureCollection : ICollectionFixture<PostgreSqlUnitTests> { }

public abstract class PostgreSqlBaseFixture
{
    public NpgsqlConnection Connection { get; protected set; }
}

/// <summary>
/// PostgreSQL Unit Test Fixture using configuration settings from testsettings.json
/// </summary>
[Collection("PostgreSqlDatabase")]
public abstract class PostgreSqlConfigurationFixture : PostgreSqlBaseFixture, IDisposable
{
    protected PostgreSqlConfigurationFixture(PostgreSqlUnitTests tests)
    {
        if (Config.Value.UnitTestsNewDatabaseFromTemplate)
        {
            var dbName = string.Concat(Config.Value.TestDatabaseName, "_", Guid.NewGuid().ToString().Replace("-", "_"));
            using var connection = new NpgsqlConnection(Config.ConnectionString);
            PostgreSqlUnitTests.CreateDatabase(connection, dbName, connection.Database);
            Connection = tests.Connection.CloneWith(tests.Connection.ConnectionString);
            Connection.Open();
            Connection.ChangeDatabase(dbName);
        }
        else
        {
            Connection = tests.Connection.CloneWith(tests.Connection.ConnectionString);
            Connection.Open();
        }

        if (Config.Value.UnitTestsUnderTransaction)
        {
            Connection.Execute("begin; set constraints all deferred;");
        }
    }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Usage", "CA1816:Dispose methods should call SuppressFinalize", Justification = "XUnit")]
    public void Dispose()
    {
        if (Config.Value.UnitTestsUnderTransaction)
        {
            Connection.Execute("rollback");
        }
        Connection.Close();
        Connection.Dispose();
        if (Config.Value.UnitTestsNewDatabaseFromTemplate)
        {
            using var connection = new NpgsqlConnection(Config.ConnectionString);
            PostgreSqlUnitTests.DropDatabase(connection, Connection.Database);
        }
    }
}

/// <summary>
/// PostgreSQL Unit Test Fixture that uses a pre-created test database.
/// </summary>
[Collection("PostgreSqlDatabase")]
public abstract class PostgreSqlTestDatabaseFixture : PostgreSqlBaseFixture, IDisposable
{
    protected PostgreSqlTestDatabaseFixture(PostgreSqlUnitTests tests)
    {
        Connection = tests.Connection.CloneWith(tests.Connection.ConnectionString);
        Connection.Open();
    }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Usage", "CA1816:Dispose methods should call SuppressFinalize", Justification = "XUnit")]
    public virtual void Dispose()
    {
        Connection.Close();
        Connection.Dispose();
    }
}

/// <summary>
/// PostgreSQL Unit Test Fixture uses a pre-created test database that runs each test under a new transaction with deferred constraint checks, that is rolled-back automatically.
/// </summary>
[Collection("PostgreSqlDatabase")]
public abstract class PostgreSqlTestDatabaseTransactionFixture : PostgreSqlTestDatabaseFixture, IDisposable
{
    protected PostgreSqlTestDatabaseTransactionFixture(PostgreSqlUnitTests tests) : base(tests)
    {
        Connection.Execute("begin; set constraints all deferred;");
    }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Usage", "CA1816:Dispose methods should call SuppressFinalize", Justification = "XUnit")]
    public override void Dispose()
    {
        Connection.Execute("rollback");
        base.Dispose();
    }
}

/// <summary>
/// PostgreSQL Unit Test Fixture using a a database that is created from the test database as a template for the each new tests and cleaned-up (dropped) after the test.
/// </summary>
[Collection("PostgreSqlDatabase")]
public abstract class PostgreSqlTestTemplateDatabaseFixture : PostgreSqlBaseFixture, IDisposable
{
    protected PostgreSqlTestTemplateDatabaseFixture(PostgreSqlUnitTests tests)
    {
        var dbName = string.Concat(Config.Value.TestDatabaseName, "_", Guid.NewGuid().ToString().Replace("-", "_"));
        using var connection = new NpgsqlConnection(Config.ConnectionString);
        PostgreSqlUnitTests.CreateDatabase(connection, dbName, connection.Database);
        Connection = tests.Connection.CloneWith(tests.Connection.ConnectionString);
        Connection.Open();
        Connection.ChangeDatabase(dbName);
    }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Usage", "CA1816:Dispose methods should call SuppressFinalize", Justification = "XUnit")]
    public virtual void Dispose()
    {
        Connection.Close();
        Connection.Dispose();
        using var connection = new NpgsqlConnection(Config.ConnectionString);
        PostgreSqlUnitTests.DropDatabase(connection, Connection.Database);
    }
}
