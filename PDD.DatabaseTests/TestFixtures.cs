#pragma warning disable CS8632
// pgroutiner auto-generated code
global using System;
global using System.Linq;
global using System.Collections.Generic;
global using System.Threading.Tasks;
global using Xunit;
global using Norm;
global using FluentAssertions;
global using PDD.Database.Extensions;
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

public sealed class PostgreSqlFixture : IDisposable
{
    public NpgsqlConnection Connection { get; }

    public PostgreSqlFixture()
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
public class DatabaseFixtureCollection : ICollectionFixture<PostgreSqlFixture> { }

[Collection("PostgreSqlDatabase")]
public abstract class PostgreSqlUnitTestFixture : IDisposable
{
    protected NpgsqlConnection Connection { get; }

    protected PostgreSqlUnitTestFixture(PostgreSqlFixture fixture)
    {
        if (Config.Value.UnitTestsNewDatabaseFromTemplate)
        {
            var dbName = string.Concat(Config.Value.TestDatabaseName, "_", Guid.NewGuid().ToString().Replace("-", "_"));
            using var connection = new NpgsqlConnection(Config.ConnectionString);
            PostgreSqlFixture.CreateDatabase(connection, dbName, connection.Database);
            Connection = fixture.Connection.CloneWith(fixture.Connection.ConnectionString);
            Connection.Open();
            Connection.ChangeDatabase(dbName);
        }
        else
        {
            Connection = fixture.Connection.CloneWith(fixture.Connection.ConnectionString);
            Connection.Open();
        }

        if (Config.Value.UnitTestsUnderTransaction)
        {
            Connection.Execute("begin");
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
            PostgreSqlFixture.DropDatabase(connection, Connection.Database);
        }
    }
}
