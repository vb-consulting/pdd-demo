using System.Collections.Concurrent;
using PDD.DatabaseTests;

public static class Extensions
{
    private static readonly ConcurrentDictionary<string, short> _countryCodes = new();

    public static short CountryCode(this PostgreSqlBaseFixture test, string iso)
    {
        return _countryCodes
            .GetOrAdd(iso, value =>
                test.Connection.Read<short>("select code from countries where iso2 = @iso", iso).Single());
    }

    public static void InsertCompanies(this PostgreSqlBaseFixture test, params (string name, string country)[] values)
    {
        test.Connection.Execute(@$"insert into companies (name, country) values
            {string.Join(", ", values.Select(v => $"('{v.name}', {test.CountryCode(v.country ?? "US")})"))}");
    }

    public static void InsertCompanies(this PostgreSqlBaseFixture test, params string[] names)
    {
        test.InsertCompanies(names.Select(v => (v, (string)null)).ToArray());
    }
}