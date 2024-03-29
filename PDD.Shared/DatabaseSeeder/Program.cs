﻿using System;
using System.Text.RegularExpressions;
using Bogus;
using Microsoft.Extensions.Configuration;
using Norm;
using Npgsql;
using NpgsqlTypes;
using PDD.WebApp.Database;
using static Bogus.DataSets.Name;

var configValue = new Config();
var configBuilder = new ConfigurationBuilder().AddCommandLine(args);
var configRoot = configBuilder.Build();
configRoot.Bind(configValue);

Console.WriteLine("This program will RECREATE the entire database schema and populate it with fake, bogus data.");
Console.WriteLine();

var currentDir = Directory.GetCurrentDirectory();
var relativePath = currentDir.EndsWith("net6.0") ? Path.Combine(currentDir, "../../../../../PDD.WebApp") : Path.Combine(currentDir, "../../PDD.WebApp");
var pgRoutinerPath = currentDir.EndsWith("net6.0") ? Path.Combine(currentDir, "../../../../../PDD.Database") : Path.Combine(currentDir, "../../PDD.Database");

var config = new ConfigurationBuilder()
    .AddJsonFile(Path.Combine(currentDir, pgRoutinerPath, "appsettings.PgRoutiner.json"), optional: false, reloadOnChange: false)
    .AddJsonFile(Path.Combine(currentDir, relativePath, "appsettings.json"), optional: false, reloadOnChange: false)
    .AddJsonFile(Path.Combine(currentDir, relativePath, "appsettings.Development.json"), optional: true, reloadOnChange: false)
    .Build();

Console.WriteLine("People: {0}", configValue.PeopleCount);
Console.WriteLine("Companies: {0}", configValue.CompanyCount);
Console.WriteLine("Schema: {0}", configValue.Schema ?? Path.Combine(currentDir, pgRoutinerPath, config.GetValue<string>("PgRoutiner:SchemaDumpFile") ?? ""));
Console.WriteLine("Data: {0}", configValue.Data ?? Path.Combine(currentDir, pgRoutinerPath, config.GetValue<string>("PgRoutiner:DataDumpFile") ?? ""));
Console.WriteLine("Connection: {0}", configValue.Connection ?? config.GetConnectionString(config.GetValue<string>(ConnectionBuilder.NameKey) ?? ""));

var schema = File.ReadAllText(configValue.Schema ?? Path.Combine(currentDir, pgRoutinerPath, config.GetValue<string>("PgRoutiner:SchemaDumpFile") ?? ""));
var data = File.ReadAllText(configValue.Data ?? Path.Combine(currentDir, pgRoutinerPath, config.GetValue<string>("PgRoutiner:DataDumpFile") ?? ""));

var connectionString = configValue.Connection ?? config.GetConnectionString(config.GetValue<string>(ConnectionBuilder.NameKey) ?? "");


Console.WriteLine("RUNNING... press CTR-C to abort!");

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
var usCode = 840;
var euCodes = connection.Read<short>("select code from countries where iso2 in ('AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE')").ToArray();
var areas = connection.Read<short>("select id from business_areas").ToArray();


List<Guid> companyIds = new();
List<string> companyNames = new();

Randomizer.Seed = new Random(DateTime.Now.Millisecond);
Regex sanitizeNameRegex = new("[^a-zA-Z0-9]");

connection.Execute("begin");

foreach (var company in new Faker<Company>()
    .StrictMode(true)
    .RuleFor(c => c.Name, f => f.Company.CompanyName())
    .RuleFor(c => c.Web, (f, c) => $"https://{sanitizeNameRegex.Replace(c?.Name ?? "", "").ToLower()}.com/")
    .RuleFor(c => c.Twitter, (f, c) => string.Concat("https://twitter.com/", sanitizeNameRegex.Replace(c?.Name ?? "", "").ToLower()).OrNull(f, .4f))
    .RuleFor(c => c.Linkedin, (f, c) => string.Concat("https://linkedin.com/", sanitizeNameRegex.Replace(c?.Name ?? "", "").ToLower()).OrNull(f, .8f))
    .RuleFor(c => c.CompanyLine, f => f.Company.CatchPhrase())
    .RuleFor(c => c.About, f => string.Join(" ", Enumerable.Range(1, f.Random.Int(1, 20)).Select(i => f.Company.Bs()))) // f.Company.Bs())
    .RuleFor(c => c.Country, f => f.Random.Number(1, 3) switch { 1 => usCode, 2 => f.Random.ArrayElement(euCodes), 3 => f.Random.ArrayElement(countries), _ => usCode })
    .RuleFor(c => c.Areas, f => f.PickRandom(areas, f.Random.Int(1, 5)).ToArray())
    .Generate(configValue.CompanyCount))
{
    var companyId = connection.Read<Guid?>(@"select id from companies where name = lower(@name)", company.Name?.ToLower()).FirstOrDefault();
    if (companyId == null)
    {
        companyId = connection.Read<Guid>(@"
        insert into companies 
        (name, web, twitter, linkedin, company_line, about, country)
        values
        (@Name, @Web, @Twitter, @Linkedin, @CompanyLine, @About, @Country)
        returning id;", company
        ).Single();
    }
    connection.Execute(string.Join("\n", company?.Areas?.Select(a => @$"
        insert into company_areas
        (company_id, area_id)
        values
        ('{companyId}'::uuid, {a})
        on conflict (company_id, area_id) do nothing;
    ") ?? Array.Empty<string>()));

    companyIds.Add(companyId.Value);
    companyNames.Add(company?.Name ?? "");
}

var employed = connection.Read<short>("select id from employee_status where lower(name) = 'employed'").Single();
var unemployed = connection.Read<short>("select id from employee_status where lower(name) = 'unemployed'").Single();
var opentoopportunity = connection.Read<short>("select id from employee_status where lower(name) = 'open to opportunity'").Single();
var activlyapplying = connection.Read<short>("select id from employee_status where lower(name) = 'actively applying'").Single();
var retired = connection.Read<short>("select id from employee_status where lower(name) = 'retired'").Single();
var unemployable = connection.Read<short>("select id from employee_status where lower(name) = 'unemployable'").Single();

var productowner = connection.Read<short>("select id from business_roles where lower(name) = 'product owner'").Single();
var projectmanager = connection.Read<short>("select id from business_roles where lower(name) = 'project manager'").Single();
var uxdesigner = connection.Read<short>("select id from business_roles where lower(name) = 'ux designer'").Single();
var uidesigner = connection.Read<short>("select id from business_roles where lower(name) = 'ui designer'").Single();
var businessanalyst = connection.Read<short>("select id from business_roles where lower(name) = 'business analyst'").Single();
var softwaredeveloper = connection.Read<short>("select id from business_roles where lower(name) = 'software developer'").Single();
var softwarearchitect = connection.Read<short>("select id from business_roles where lower(name) = 'software architect'").Single();
var devops = connection.Read<short>("select id from business_roles where lower(name) = 'devops'").Single();
var devopsengineer = connection.Read<short>("select id from business_roles where lower(name) = 'devops engineer'").Single();
var devopslead = connection.Read<short>("select id from business_roles where lower(name) = 'devops lead'").Single();
var tester = connection.Read<short>("select id from business_roles where lower(name) = 'tester'").Single();
var qalead = connection.Read<short>("select id from business_roles where lower(name) = 'qa lead'").Single();
var qaengineer = connection.Read<short>("select id from business_roles where lower(name) = 'qa engineer'").Single();
var techlead = connection.Read<short>("select id from business_roles where lower(name) = 'tech lead'").Single();
var scrummaster = connection.Read<short>("select id from business_roles where lower(name) = 'scrum master'").Single();
var softwaredevelopmentmanager = connection.Read<short>("select id from business_roles where lower(name) = 'software development manager'").Single();
var databaseadministrator = connection.Read<short>("select id from business_roles where lower(name) = 'database administrator'").Single();
var databasedeveloper = connection.Read<short>("select id from business_roles where lower(name) = 'database developer'").Single();

var managerRoles1 = new short[] { productowner, projectmanager, businessanalyst, scrummaster, softwaredevelopmentmanager };
var managerRoles2 = new short[] { projectmanager, businessanalyst };
var managerRoles3 = new short[] { productowner, softwaredevelopmentmanager };

var uiRoles1 = new short[] { uxdesigner, uidesigner };
var uiRoles2 = new short[] { uidesigner };

var devRoles1 = new short[] { softwaredeveloper, softwarearchitect, techlead, databaseadministrator, databasedeveloper };
var devRoles2 = new short[] { softwarearchitect, techlead, databaseadministrator, databasedeveloper };
var devRoles3 = new short[] { softwaredeveloper, softwarearchitect };
var devRoles4 = new short[] { softwaredeveloper, databaseadministrator, databasedeveloper };

var devopsRoles1 = new short[] { devops, devopsengineer, techlead, devopslead };
var devopsRoles2 = new short[] { devops, devopsengineer };

var qaRoles1 = new short[] { tester, qalead, qaengineer };
var qaRoles2 = new short[] { tester };
var qaRoles3 = new short[] { tester, qalead };

var dbRoles1 = new short[] { databaseadministrator, databasedeveloper };
var dbRoles2 = new short[] { databaseadministrator };

var roles = new short[][]
{
    managerRoles1, managerRoles2, managerRoles3,
    uiRoles1, uiRoles2,
    devRoles1, devRoles2, devRoles3, devRoles4,
    devopsRoles1, devopsRoles2,
    qaRoles1, qaRoles2, qaRoles3,
    dbRoles1, dbRoles2
};

string FakeFirstName(Faker f, Person p)
{
    var name = f.Name.FirstName(p.Gender);
    if (p.Gender == Gender.Male)
    {
        if (!name.EndsWith("i"))
        {
            name = f.Random.Number(1, 7) switch
            {
                1 => $"{name}inski",
                2 => $"{name}islav",
                3 => $"{name}iv",
                4 => $"{name}iverton",
                5 => $"{name}iverson",
                6 => $"{name}ir",
                7 => $"{name}iston",
                _ => name
            };
        }
        else
        {
            name = f.Random.Number(1, 3) switch
            {
                1 => $"{name}ston",
                2 => $"{name}athan",
                3 => $"{name}atan",
                _ => name
            };
        }
    }
    if (p.Gender == Gender.Female)
    {
        if (!name.EndsWith("a"))
        {
            name = f.Random.Number(1, 5) switch
            {
                1 => $"{name}ana",
                2 => $"{name}stazia",
                3 => $"{name}da",
                4 => $"{name}moja",
                5 => $"{name}tvoja",
                _ => name
            };
        }
        else
        {
            name = f.Random.Number(1, 3) switch
            {
                1 => $"{name}vova",
                2 => $"{name}lyna",
                3 => $"{name}lova",
                _ => name
            };
        }
    }
    return name;
}

foreach (var person in new Faker<Person>()
    .StrictMode(true)
    .RuleFor(p => p.Gender, f => f.PickRandom<Gender>())
    .RuleFor(p => p.FirstName, (f, p) => FakeFirstName(f, p))
    .RuleFor(p => p.LastName, (f, p) => f.Name.LastName(p.Gender))
    .RuleFor(p => p.Email, (f, p) => f.Internet.Email(p.FirstName, p.LastName).ToLower()
        .Replace("@yahoo.com", "@zzzahoo.kom")
        .Replace("@hotmail.com", "@shotmejl.kom")
        .Replace("@gmail.com", "@dzmejl.kom"))
    .RuleFor(c => c.Twitter, (f, p) => string.Concat("https://twitter.com/", p?.Email?.Split("@").First().Split(".").First().ToLower()).OrNull(f, .25f))
    .RuleFor(c => c.Linkedin, (f, p) => string.Concat("https://www.linkedin.com/", p?.Email?.Split("@").First().Split(".").First().ToLower()).OrNull(f, .6f))
    .RuleFor(p => p.Birth, f => f.Date.Between(DateTime.Now.AddYears(-80), DateTime.Now.AddYears(-15)))
    .RuleFor(p => p.Country, f => f.Random.Number(1, 3) switch { 1 => usCode, 2 => f.Random.ArrayElement(euCodes), 3 => f.Random.ArrayElement(countries), _ => usCode })
    .Generate(configValue.PeopleCount))
{
    var attr = new Faker<PersonAttributes>()
        .RuleFor(a => a.Reviews, (f, a) =>
        {
            var n = f.Random.Int(0, 5).OrNull(f, .45f);
            if (n == null)
            {
                return Array.Empty<(Guid companyId, string review, int? score)>();
            }
            var result = new (Guid companyId, string review, int? score)[n.Value];
            var attrCompaniesIds = f.PickRandom(companyIds, n.Value).ToArray();
            for (int i = 0; i < n; i++)
            {
                result[i] = (
                    attrCompaniesIds[i],
                    f.Rant.Review(companyNames[i]),
                    f.Random.Int(1, 10) switch 
                    { 
                        1 => null,
                        2 => null,
                        3 => null,
                        4 => null,
                        5 => 1,
                        6 => 2,
                        7 => f.Random.Int(3, 4),
                        8 => f.Random.Int(3, 4),
                        9 => f.Random.Int(3, 4),
                        10 => f.Random.Int(4, 5),
                        _ => 1
                    } 
                );
            }
            return result;
        })
        .RuleFor(a => a.EmployeeRecord, (f, a) =>
        {
            var result = new List<(Guid companyId, DateTime started, DateTime? ended)>();
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
        .RuleFor(a => a.Roles, (f, a) => roles[f.Random.Int(0, roles.Length - 1)])
        .Generate();

    var randomizer = new Randomizer(DateTime.Now.Millisecond);
    short status = unemployable;
    var onetothree = randomizer.Int(1, 3);

    if (!attr.EmployeeRecord.Any())
    {
        status = randomizer.ArrayElement(new short[] { unemployed, activlyapplying, unemployable });
    }
    //else if (DateTime.Now.Year - person.Birth.Year > 65)
    //{
    //    status = retired;
    //}
    else if (DateTime.Now.Year - person.Birth.Year > randomizer.Int(60, 100) && onetothree == 1 || onetothree == 2)
    {
        status = randomizer.ArrayElement(new short[] { retired, unemployable });
    }
    else
    {
        var last = attr.EmployeeRecord.Last();
        if (last.ended == null | last.ended > DateTime.Now)
        {
            status = employed; //randomizer.ArrayElement(new short[] { retired, activlyapplying });
        }
        else
        {
            status = randomizer.ArrayElement(new short[] { employed, opentoopportunity, activlyapplying });
        }
    }

    var personId = connection.Read<Guid?>(@"select id from people where lower(first_name) = @first_name and lower(last_name) = @last_name", new { 
        first_name = person.FirstName?.ToLower(),
        last_name = person.LastName?.ToLower()
    }).FirstOrDefault();
    if (personId == null)
    {
        personId = connection.Read<Guid>(@"
        insert into people 
        (first_name, last_name, employee_status, gender, email, linkedin, twitter, birth, country)
        values
        (@firstName, @lastName, @status, @gender::valid_genders, @email, @twitter, @linkedin, @birth, @country)
        returning id;", new
        {
            firstName = person.FirstName,
            lastName = person.LastName,
            status,
            gender = person.Gender.ToString().First().ToString(),
            person.Email,
            person.Twitter,
            person.Linkedin,
            birth = (person.Birth, NpgsqlDbType.Date),
            person.Country,
        }).Single();
    }
    connection.Execute(string.Join("\n", attr.Roles.Select(r => @$"
        insert into person_roles
        (person_id, role_id)
        values
        ('{personId}'::uuid, {r})
        on conflict (person_id, role_id) do nothing;
    ")));

    if (attr.Reviews.Any())
    {
        connection.Execute(string.Join("\n", attr.Reviews.Select(r => @$"
            insert into company_reviews 
            (company_id, person_id, review, score)
            values 
            ('{r.companyId}'::uuid, '{personId}'::uuid, $r${r.review}$r$, {(r.score == null ? "NULL" : r.score.ToString())});
        ")));
    }

    if (attr.EmployeeRecord.Any())
    {
        connection.Execute(string.Join("\n", attr.EmployeeRecord.Select(r => @$"
            insert into employee_records 
            (company_id, person_id, employment_started_at, employment_ended_at)
            values 
            ('{r.companyId}'::uuid, '{personId}'::uuid, '{r.started:yyyy-MM-dd}', {(r.ended == null ? "NULL" : $"'{r.ended.Value:yyyy-MM-dd}'")});
        ")));
    }
}

connection.Execute("commit");

public class Company
{
    public string? Name { get; set; }
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
    public DateTime Birth { get; set; }
    public int Country { get; set; }
}

public class PersonAttributes
{
    public (Guid companyId, string review, int? score)[] Reviews { get; set; } = 
        Array.Empty<(Guid companyId, string review, int? score)>();

    public (Guid companyId, DateTime started, DateTime? ended)[] EmployeeRecord { get; set; } =
        Array.Empty<(Guid companyId, DateTime started, DateTime? ended)>();

    public short[] Roles { get; set; } = Array.Empty<short>();
}

public class Config
{
    public int PeopleCount { get; set; } = 100000;
    public int CompanyCount { get; set; } = 5000;
    public string? Data { get; set; } = null;
    public string? Schema { get; set; } = null;
    public string? Connection { get; set; } = null;
}