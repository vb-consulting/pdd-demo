using System.Collections.Concurrent;
using System.Diagnostics.Metrics;
using PDD.DatabaseTests;
using static System.Formats.Asn1.AsnWriter;

public static class Extensions
{
    private static readonly ConcurrentDictionary<string, short> _countryCodes = new();

    public static short CountryCode(this PostgreSqlBaseFixture test, string iso)
    {
        return _countryCodes
            .GetOrAdd(iso, value =>
                test.Connection.Read<short>("select code from countries where iso2 = @iso", iso).Single());
    }

    public static Guid InsertPerson(this PostgreSqlBaseFixture test, string name)
    {
        return test.Connection.Read<Guid>(@$"
            insert into people (first_name, last_name) values (@name, @name) returning id", new { name }).SingleOrDefault();
    }

    public static void InsertCompanies(this PostgreSqlBaseFixture test, params (string name, string country)[] values)
    {
        test.Connection.Execute(@$"
            insert into companies (name, country) values
            {string.Join(", ", values.Select(v => $"('{v.name}', {test.CountryCode(v.country)})"))}");
    }

    public static PostgreSqlBaseFixture InsertCompanyWithScoreAndAreas(this PostgreSqlBaseFixture test, 
        Guid personId, 
        string name, 
        int[] scores, 
        string[] areas)
    {
        var companyId = test.Connection.Read<Guid>("insert into companies (name, country) values (@name, @country) returning id", 
            new 
            {
                name, 
                country = test.CountryCode("US") 
            }).SingleOrDefault();

        foreach (var score in scores)
        {
            test.Connection.Execute(@"
            insert into company_reviews (company_id, person_id, score) 
            values (@companyId, @personId, @score)", 
            new { companyId, personId, score });
        }
        foreach (var area in areas)
        {
            test.Connection.Execute(@"
            insert into company_areas (company_id, area_id) 
            values (@companyId, (select id from business_areas where name_normalized = lower(@area) limit 1))",
            new { companyId, area });
        }
        return test;
    }
}