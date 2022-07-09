using System;
using System.Text.RegularExpressions;
using Bogus;
using Microsoft.Extensions.Configuration;
using Norm;
using Npgsql;
using NpgsqlTypes;
using static Bogus.DataSets.Name;

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

Console.WriteLine(".................................START.................................................................");

Console.WriteLine("Recreating schema...");
using (var recreateSchema = new NpgsqlConnection(connectionString))
{
    recreateSchema.Execute(schema).Execute(data);
}
Console.WriteLine("Done!");

NormOptions.Configure(options =>
{
    options.CommandCommentHeader.Enabled = true;
    options.CommandCommentHeader.IncludeCallerInfo = false;
    options.CommandCommentHeader.IncludeCommandAttributes = false;
    options.CommandCommentHeader.IncludeTimestamp = false;
    options.CommandCommentHeader.IncludeParameters = true;
    options.DbCommandCallback = cmd => Console.WriteLine(cmd.CommandText);
});
using var connection = new NpgsqlConnection(connectionString);

var countries = connection.Read<short>("select code from countries where culture is not null").ToArray();
var areas = connection.Read<short>("select id from areas").ToArray();

const int peopleCount = 50000;
const int companyCount = 1000;

List<long> companyIds = new();
List<string> companyNames = new();

Randomizer.Seed = new Random(DateTime.Now.Millisecond);
Regex sanitizeNameRegex = new("[^a-zA-Z0-9]");

foreach(var company in new Faker<Company>()
    .StrictMode(true)
    .RuleFor(c => c.Name, f => f.Company.CompanyName())
    .RuleFor(c => c.NameNormalized, (f, c) => c?.Name?.ToLower())
    .RuleFor(c => c.Web, (f, c) => $"https://{sanitizeNameRegex.Replace(c?.Name ?? "", "").ToLower()}.com/")
    .RuleFor(c => c.Twitter, (f, c) => string.Concat("https://twitter.com/", sanitizeNameRegex.Replace(c?.Name ?? "", "").ToLower()).OrNull(f, .4f))
    .RuleFor(c => c.Linkedin, (f, c) => string.Concat("https://linkedin.com/", sanitizeNameRegex.Replace(c?.Name ?? "", "").ToLower()).OrNull(f, .8f))
    .RuleFor(c => c.CompanyLine, f => f.Company.CatchPhrase())
    .RuleFor(c => c.About, f => f.Company.Bs())
    .RuleFor(c => c.Country, f => countries[f.Random.Number(countries.Length - 1)])
    .RuleFor(c => c.Areas, f => f.PickRandom(areas, f.Random.Int(1, 5)).ToArray())
    .Generate(companyCount))
{
    var companyId = connection.Read<long>(@"
        insert into companies 
        (name, name_normalized, web, tweeter, Linkedin, company_line, about, country)
        values
        (@Name, @NameNormalized, @Web, @Twitter, @Linkedin, @CompanyLine, @About, @Country)
        returning id;", company
    ).Single();
    
    connection.Execute(string.Join("\n", company?.Areas?.Select(a => @$"
        insert into company_areas
        (company_id, area_id)
        values
        ({companyId}, {a});
    ") ?? Array.Empty<string>()));

    companyIds.Add(companyId);
    companyNames.Add(company?.Name ?? "");
}

foreach(var person in new Faker<Person>()
    .StrictMode(true)
    .RuleFor(p => p.Gender, f => f.PickRandom<Gender>())
    .RuleFor(p => p.FirstName, (f, p) => f.Name.FirstName(p.Gender))
    .RuleFor(p => p.LastName, (f, p) => f.Name.LastName(p.Gender))
    .RuleFor(p => p.Email, (f, p) => f.Internet.Email(p.FirstName, p.LastName).ToLower())
    .RuleFor(c => c.Twitter, (f, p) => string.Concat("https://twitter.com/", p?.Email?.Split("@").First().Split(".").First().ToLower()).OrNull(f, .25f))
    .RuleFor(c => c.Linkedin, (f, p) => string.Concat("https://www.linkedin.com/", p?.Email?.Split("@").First().Split(".").First().ToLower()).OrNull(f, .6f))
    .RuleFor(p => p.Phone, f => f.Phone.PhoneNumber())
    .RuleFor(p => p.Birth, f => f.Date.Between(DateTime.Now.AddYears(-80), DateTime.Now.AddYears(-15)))
    .RuleFor(p => p.Country, f => countries[f.Random.Number(countries.Length-1)])
    .Generate(peopleCount))
{
    var personId = connection.Read<long>(@"
        insert into people 
        (first_name, last_name, name_normalized, gender, email, linkedin, twitter, phone, birth, country)
        values
        (@firstName, @lastName, @normalized, @gender, @email, @twitter, @linkedin, @phone, @birth, @country)
        returning id;", new
    {
        firstName = person.FirstName,
        lastName = person.LastName,
        normalized = $"{person.FirstName} {person.LastName}\n{person.LastName} {person.FirstName}".ToLower(),
        gender = person.Gender.ToString().First().ToString(),
        person.Email,
        person.Twitter,
        person.Linkedin,
        person.Phone,
        birth = (person.Birth, NpgsqlDbType.Date),
        person.Country,
    }).Single();

    var attr = new Faker<PersonAttributes>()
        .RuleFor(a => a.Reviews, (f, a) =>
        {
            var n = f.Random.Int(0, 10).OrNull(f, .45f);
            if (n == null)
            {
                return Array.Empty<(long companyId, string review, int score)>();
            }
            var result = new (long companyId, string review, int score)[n.Value];
            var attrCompaniesIds = f.PickRandom(companyIds, n.Value).ToArray();
            for (int i = 0; i < n; i++)
            {
                result[i] = (
                    attrCompaniesIds[i],
                    f.Rant.Review(companyNames[i]),
                    f.Random.Int(1, 5)
                );
            }
            return result;
        })
        .RuleFor(a => a.EmployeeRecord, (f, a) =>
        {
            var result = new List<(long companyId, DateTime started, DateTime? ended)>();
            var now = DateTime.Now;
            var start = person.Birth.AddYears(18 + f.Random.Int(0, 10)).AddMonths(f.Random.Int(0, 12));
            if (start >= now)
            {
                return result.ToArray();
            }
            result.Add((f.PickRandom(companyIds), start, null));
            while (true)
            {
                start = start.AddYears(f.Random.Int(1, 25)).AddMonths(f.Random.Int(0, 12));
                if (start >= now)
                {
                    break;
                }
                var last = result[result.Count - 1];
                last.ended = start;
                result[result.Count - 1] = last;
                result.Add((f.PickRandom(companyIds), start, null));
            }
            return result.ToArray();
        })
        .Generate();

    if (attr.Reviews.Any())
    {
        connection.Execute(string.Join("\n", attr.Reviews.Select(r => @$"
            insert into company_reviews 
            (company_id, person_id, review, rate)
            values 
            ({r.companyId}, {personId}, $r${r.review}$r$, {r.score});
        ")));
    }

    if (attr.EmployeeRecord.Any())
    {
        connection.Execute(string.Join("\n", attr.EmployeeRecord.Select(r => @$"
            insert into employee_records 
            (company_id, person_id, employment_started_at, employment_ended_at)
            values 
            ({r.companyId}, {personId}, '{r.started:yyyy-MM-dd}', {(r.ended == null ? "NULL" : $"'{r.ended.Value:yyyy-MM-dd}'")});
        ")));
    }
}


public class Company
{
    public string? Name { get; set; }
    public string? NameNormalized { get; set; }
    public string? Web { get; set; }
    public string? Linkedin { get; set; }
    public string? Twitter { get; set; }
    public string? CompanyLine { get; set; }
    public string? About { get; set; }
    public int Country { get; set; }
    public short[]? Areas { get; set; }
}

public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public Gender Gender { get; set; }
    public string? Email { get; set; }
    public string? Linkedin { get; set; }
    public string? Twitter { get; set; }
    public string? Phone { get; set; }
    public DateTime Birth { get; set; }
    public int Country { get; set; }
}

public class PersonAttributes
{
    public (long companyId, string review, int score)[] Reviews { get; set; } = 
        Array.Empty<(long companyId, string review, int score)>();

    public (long companyId, DateTime started, DateTime? ended)[] EmployeeRecord { get; set; } =
        Array.Empty<(long companyId, DateTime started, DateTime? ended)>();
}