// pgroutiner auto-generated code

namespace PDD.DatabaseTests;

///<summary>
/// Test method for plpgsql function public.search_countries
///</summary>
public class SearchCountriesUnitTests : PostgreSqlConfigurationFixture
{
    public SearchCountriesUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void SearchCountries_Test1()
    {
        // Arrange
        string? search = default;
        int? skip = default;
        int? take = default;

        // Act
        var result = Connection.SearchCountries(search, skip, take);

        // Assert
        // todo: adjust assert logic template to match actual logic
        search.Should().BeEquivalentTo(result);
    }

    [Fact]
    public async Task SearchCountriesAsync_Test1()
    {
        // Arrange
        string? search = default;
        int? skip = default;
        int? take = default;

        // Act
        var result = await Connection.SearchCountriesAsync(search, skip, take);

        // Assert
        // todo: adjust assert logic template to match actual logic
        search.Should().BeEquivalentTo(result);
    }
}
