[![build-test-publish](https://github.com/vb-consulting/pdd-demo/actions/workflows/build-test-publish.yml/badge.svg)](https://github.com/vb-consulting/pdd-demo/actions/workflows/build-test-publish.yml)

# PDD Demo Web Application

This is a **proof-of-concept** to demonstrate the feasibility of two different concepts in software development.

The attributes in which I'm interested are:
1) Productivity or development velocity
2) Maintainability and Testability
3) Scalability, both vertical and horizontal

To be able to do that, this repo contains an implementation of two projects:

1) Web Application [/PDD.WebApp](/PDD.WebApp) - a typical business web application with the implementation of a fairly complex and entirely made-up domain. It contains a searchable database of companies and people, where people may have certain business roles which may have types, they can have employment history in different companies, which can have reviews, etc.

2) Data generator [`/PDD.Shared/DatabaseSeeder`](/PDD.Shared/DatabaseSeeder) - console application that can generate any number of faked (made-up), but realistic, data records in the database. 

Those two concepts are:

## 1) Database-First using PostgreSQL coupled with Test-Driven-Development (TDD)

The idea is that developer can build and develop a data schema and an entire API (containing entire logic) on a local PostgreSQL instance.

A special tool called [Pgroutiner](https://github.com/vb-consulting/PgRoutiner) is then used to **generate automatically** - all that is necessary (scripts, code, models, templates, documentation, etc) to facilitate everything necessary for successful development.

The concept is named **PostgreSQL Driven Development.** or PDD, which is how this project is named.

A quick example, one table `users` and one functions `select_user`:

```sql
create table public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    email character varying NOT NULL,
    name character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

create function select_users() returns setof users language sql as 'select * from users';
create function select_user(_id uuid) returns users language sql as 'select * from users where id = _id';
```

This will generate the following code :

```csharp
#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.Database.Extensions;

public class Users
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string? Name { get; set; }
    public DateTime CreatedAt { get; set; }
}
```
```csharp
#pragma warning disable CS8632
// pgroutiner auto-generated code
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions;

public static class PgRoutineSelectUser
{
    public const string Name = "public.select_user";
    public const string Query = $"select id, email, name, data, providers, timezone, culture, person_id, lockout_end, created_at from {Name}($1)";

    /// <summary>
    /// Executes sql function public.select_user(uuid)
    /// </summary>
    /// <param name="id">_id uuid</param>
    /// <returns>IEnumerable of Users instances</returns>
    public static IEnumerable<Users> SelectUser(this NpgsqlConnection connection, Guid? id)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Uuid, Value = id == null ? DBNull.Value : id }
            },
            UnknownResultTypeList = new bool[] { false, true, true, true }
        };
        if (connection.State != System.Data.ConnectionState.Open)
        {
            connection.Open();
        }
        using var reader = command.ExecuteReader(System.Data.CommandBehavior.Default);
        while (reader.Read())
        {
            object[] values = new object[4];
            reader.GetProviderSpecificValues(values);
            yield return new Users
            {
                Id = (Guid)values[0],
                Email = (string)values[1],
                Name = values[2] == DBNull.Value ? null : (string)values[2],
                CreatedAt = (DateTime)values[3]
            };
        }
    }

    /// <summary>
    /// Asynchronously executes sql function public.select_user(uuid)
    /// </summary>
    /// <param name="id">_id uuid</param>
    /// <returns>IAsyncEnumerable of Users instances</returns>
    public static async IAsyncEnumerable<Users> SelectUserAsync(this NpgsqlConnection connection, Guid? id)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Uuid, Value = id == null ? DBNull.Value : id }
            },
            UnknownResultTypeList = new bool[] { false, true, true, true }
        };
        if (connection.State != System.Data.ConnectionState.Open)
        {
            await connection.OpenAsync();
        }
        using var reader = await command.ExecuteReaderAsync(System.Data.CommandBehavior.Default);
        while (await reader.ReadAsync())
        {
            object[] values = new object[4];
            reader.GetProviderSpecificValues(values);
            yield return new Users
            {
                Id = (Guid)values[0],
                Email = (string)values[1],
                Name = values[2] == DBNull.Value ? null : (string)values[2],
                CreatedAt = (DateTime)values[3]
            };
        }
    }
}
```
```csharp
// pgroutiner auto-generated code

using PDD.Database.Extensions;

namespace PDD.DatabaseTests;

///<summary>
/// Test method for sql function public.select_users
///</summary>
public class SelectUsersUnitTests : PostgreSqlConfigurationFixture
{
    public SelectUsersUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void SelectUsers_Test1()
    {
        // Arrange

        // Act
        var result = Connection.SelectUsers().ToList();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(List<Users>), result);
    }

    [Fact]
    public async Task SelectUsersAsync_Test1()
    {
        // Arrange

        // Act
        var result = await Connection.SelectUsersAsync().ToListAsync();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(List<Users>), result);
    }
}
```

In addition, it will also create:

- Full schema script to be used in source control and to be used in the unit tests.
- Data script for selected tables which are to be kept in source control also, and used with the unit tests.
- Script for each individual object (just for reference). In this example, this would be two files, one for table and one for function.
- Markdown documentation. See the example here: [`/PDD.Database`](/PDD.Database)

## 2) Frontend that uses a hybrid SPA approach with Svelte and Razor Pages

This approach will have a page router on the backend and the backend will still serve individual pages, just as classic web application do.

However, the entire Frontend markup and code are contained within the Svelte compiler output single JavaScript file.
This means that the entire markup will be cached on client for each subsequent request which makes downloads significantly lower and reduces network traffic for your application.

Markup is then rendered instantly when the page loads.

See more at [RazorSvelte](https://github.com/vb-consulting/RazorSvelte) which hosts this application template.

## Tech Stack

- Backend: PostgreSQL 15.
- Middleware: .NET7 and C# with Pgroutiner local tool for code generation.
- Frontend Razor Pages with SvelteJS from [RazorSvelte](https://github.com/vb-consulting/RazorSvelte) template.

## Solution Structure

- [`/PDD.Database`](/PDD.Database) - shared library that contains all data access code and all database scripts as well as `PgRoutiner` configuration. All code in this project is automatically generated on command.
- [`/PDD.DatabaseTests`](/PDD.DatabaseTests) - unit tests project.
- [`/PDD.Shared/DatabaseSeeder`](/PDD.Shared/DatabaseSeeder) - database seeder console application project that will generate fake and random data in the database on command.
- [`/PDD.WebApp`](/PDD.WebApp) - web application project.

## Installation

**Dockerfile with a full example coming soon...**

```
$ git clone https://github.com/vb-consulting/pdd-demo.git
$ cd pdd-demo
$ cd PDD.WebApp
$ npm install
```

Note: `npm install` will install the required NPM libraries and the `PgRoutiner` **local tool** as well. To install `PgRoutiner` as global tool run this command `$ dotnet tool install --global dotnet-pgroutiner`

To install the database, first, create an empty database on your server. To do this and database client will do (`psql` or `pgAdmin` for example). But you can also run `pgroutiner -c "Server=localhost;Db=postgres;Port=5432;User Id=postgres;Password=postgres;" -x "create database pdd"` if you have `PgRoutiner` as a global tool or `dotnet tool run pgroutiner -c "Server=localhost;Db=postgres;Port=5432;User Id=postgres;Password=postgres;" -x "create database test"` if you have `PgRoutiner` as a local tool.

Next, add `appsettings.Development.json` to your `/PDD.WebApp` dir with the following content:

```json
{
  "ConnectionStrings": {
    "DatabaseConnection": "Server=localhost;Db=pdd;Port=5434;User Id=postgres;Password=postgres;"
  },

  "AppendCommandHeaders": true,
  "LogCommands": true
}
```

Note: `appsettings.Development.json` is git ignored and you can set the database port, name username and password to your environment.

Finally, create the initial schema in your new database:

- To create an empty schema run the following command `pgroutiner -x ../PDD.Database/Scripts/schema.sql` (use `dotnet tool run` for local tools). This will use your application connection string to execute `../PDD.Database/Scripts/schema.sql` schema file.

- To recreate schema and add initial fake and random data, run the [`/PDD.Shared/DatabaseSeeder`](/PDD.Shared/DatabaseSeeder) command line tool.

Finally, run the application `dotnet run`.
