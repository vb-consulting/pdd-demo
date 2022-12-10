// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Companies;

///<summary>
/// Test method for plpgsql function companies.search_countries
///
/// Search countries by name or iso2 or iso3.
/// Result is pageable JSON response `{count, data: [...]}`
/// Data record has value and name suitable for select type controls./// /// Countries with companies are sorted first by name, followed by null record (separator) and then by countries without companies sorted by name.
///</summary>
public class SearchCountriesUnitTests : PostgreSqlConfigurationFixture
{
    public SearchCountriesUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void SearchCountries_Empty_Json_Test()
    {
        // Arrange
        string search = default;
        int? skip = default;
        int? take = default;

        // Act
        var result = Connection.SearchCountries(search, skip, take);

        // Assert
        dynamic data = JsonConvert.DeserializeObject(result);
        (data.count is JValue).Should().BeTrue();
        (data.page is JArray).Should().BeTrue();

        ((long)data.count.Value).Should().Be(249);
    }

    [Fact]
    public void SearchCountries_Search_Test()
    {
        // Arrange
        string search = "hrv";
        int? skip = default;
        int? take = default;

        // Act
        var result = JsonConvert.DeserializeAnonymousType(Connection.SearchCountries(search, skip, take), new
        {
            count = default(int),
            page = new[]
            {
                new
                {
                    value = default(int?),
                    name = default(string),
                    iso2 = default(string),
                    iso3 = default(string),
                }
            }
        });

        // Assert
        result.count.Should().Be(1);
        result.page.Should().BeEquivalentTo(new object[2]
        {
            new
            {
                value = (int?)null,
                name = (string)null,
                iso2 = (string)null,
                iso3 = (string)null,
            },
            new
            {
                value = 191,
                name = "Croatia",
                iso2 = "HR",
                iso3 = "HRV",
            }
        });

    }
}
