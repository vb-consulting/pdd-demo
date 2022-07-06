using Bogus;
using Microsoft.Extensions.Configuration;
using Norm;
using Npgsql;

Console.WriteLine("Hello, World!");
Console.WriteLine("This program will RECREATE the entire database schema and populate it with fake, bogus data.");
Console.WriteLine("Hit enter to continue or any other key to abort...");
var c = Console.ReadKey();
if (c.Key != ConsoleKey.Enter)
{
    return;
}

var currentDir = Directory.GetCurrentDirectory();
var relativePath = currentDir.EndsWith("net6.0") ? Path.Combine(currentDir, "../../../../PDDWebApp") : Path.Combine(currentDir, "../PDDWebApp");

var config = new ConfigurationBuilder()
    .AddJsonFile(Path.Combine(currentDir, relativePath, "appsettings.PgRoutiner.json"), optional: false, reloadOnChange: false)
    .AddJsonFile(Path.Combine(currentDir, relativePath, "appsettings.json"), optional: false, reloadOnChange: false)
    .AddJsonFile(Path.Combine(currentDir, relativePath, "appsettings.Development.json"), optional: true, reloadOnChange: false)
    .Build();

var schema = File.ReadAllText(Path.Combine(currentDir, relativePath, config.GetValue<string>("PgRoutiner:SchemaDumpFile")));
var data = File.ReadAllText(Path.Combine(currentDir, relativePath, config.GetValue<string>("PgRoutiner:DataDumpFile")));

var connectionString = config.GetConnectionString(config.GetValue<string>(PDDWebApp.Database.ConnectionBuilder.NameKey));

Console.WriteLine("...............................................................................................");
using var connection = new NpgsqlConnection(connectionString);


Console.WriteLine("Recreating schema...");
connection
    .Execute("drop schema public cascade; create schema public;")
    .Execute(schema)
    .Execute(data);
Console.WriteLine("Done!");

// 50000 people
// 1000 companies

//var people = new Faker<People>();

public record Company(string name, string email, string linkedin, string tweeter, string company_line, string about, int country);
public record People(string first_name, string last_name, string email, string linkedin, string twitter, string phone, DateOnly birth, int country);
