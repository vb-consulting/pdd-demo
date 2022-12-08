[![build-test-publish](https://github.com/vb-consulting/pdd-demo/actions/workflows/build-test-publish.yml/badge.svg)](https://github.com/vb-consulting/pdd-demo/actions/workflows/build-test-publish.yml)

# PDD Demo Web Application

PDD stands for **PostgreSQL Driven Development.**

**PostgreSQL Driven Development** or PDD means that the entire business logic is implemented as **PostgreSQL stored functions and procedures.**

To be able to achieve that task with ease - [Pgroutiner .NET tool](https://github.com/vb-consulting/PgRoutiner) is used. `PgRoutiner` generates all database access, data mappings, and database scripts.

Also, entire the business logic implemented in PostgreSQL functions is fully covered with [unit tests](/PDD.DatabaseTests). `PgRoutiner` automatically generates unit test basic templates (code without implemented assertion part), which facilitates the TDD (test-driven development) approach in addition.

And, lastly, `PgRoutiner` automatically generates an entire **database and backend documentation** automatically - from database schema, database schema comments and configured code generator. You can see generated markdown readme in the [database project root](/PDD.Database)

This repository demonstrates this approach in a typical business application. Data is random-generated and purely fictional. The data generator is also included.

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
