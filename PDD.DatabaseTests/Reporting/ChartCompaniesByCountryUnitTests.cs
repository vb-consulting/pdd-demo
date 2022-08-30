#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

public class ChartCompaniesByCountryUnitTests : PostgreSqlUnitTestFixture
{
    public ChartCompaniesByCountryUnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    ///<summary>
    /// Test method for sql function reporting.chart_companies_by_country(integer).
    ///
    /// Number of companies by country.
    /// Json object where lables are country names and it only have one series with the number of companies for each country.
    /// It show only first 9 conutries and 10th is summed together as other. 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public void ChartCompaniesByCountry_Test1()
    {
        // Arrange
        int? limit = default;

        // Act
        var result = Connection.ChartCompaniesByCountry(limit);

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    ///<summary>
    /// Test method for sql function reporting.chart_companies_by_country().
    ///
    /// Number of companies by country.
    /// Json object where lables are country names and it only have one series with the number of companies for each country.
    /// It show only first 9 conutries and 10th is summed together as other. 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public void ChartCompaniesByCountry_Test2()
    {
        // Arrange

        // Act
        var result = Connection.ChartCompaniesByCountry();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
