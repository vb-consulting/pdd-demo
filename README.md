[![build-test-publish](https://github.com/vb-consulting/pdd-demo/actions/workflows/build-test-publish.yml/badge.svg)](https://github.com/vb-consulting/pdd-demo/actions/workflows/build-test-publish.yml)

# PDD Demo Web Application

This is a **proof-of-concept** demo application with a made-up, fictional domain.

## Tech Stack

- Backend: PostgreSQL 15.
- Middleware: .NET7 and C# with [PgRoutiner](https://github.com/vb-consulting/PgRoutiner) local tool for code generation.
- Frontend Razor Pages with SvelteJS from [RazorSvelte](https://github.com/vb-consulting/RazorSvelte) template.

## Solution Structure

- [`/PDD.Database`](/PDD.Database) - shared library that contains all data access code and all database scripts as well as `PgRoutiner` configuration. All code in this project is automatically generated on command.
- [`/PDD.DatabaseTests`](/PDD.DatabaseTests) - unit tests project.
- [`/PDD.Shared/DatabaseSeeder`](/PDD.Shared/DatabaseSeeder) - database seeder console application project that will generate fake and random data in the database on command.
- - [`/PDD.Shared/DatabaseShared`](/PDD.Shared/DatabaseShared) - database access shared references.
- [`/PDD.WebApp`](/PDD.WebApp) - web application project.

## Installation

**Dockerfile with a full example coming soon.**

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
