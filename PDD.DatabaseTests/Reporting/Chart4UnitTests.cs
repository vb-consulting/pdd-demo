#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

public class Chart4UnitTests : PostgreSqlUnitTestFixture
{
    public Chart4UnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    ///<summary>
    /// Test method for sql function reporting.chart_4().
    ///
    /// Number of companies by country.
    /// Json object where lables are country names and it only have one series with the number of companies for each country.
    /// It show only first 9 conutries and 10th is summed together as other. 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public void Chart4_Test1()
    {
        // Arrange

        // Act
        var result = Connection.Chart4();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    ///<summary>
    /// Test method for sql function reporting.chart_4().
    ///
    /// Number of companies by country.
    /// Json object where lables are country names and it only have one series with the number of companies for each country.
    /// It show only first 9 conutries and 10th is summed together as other. 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public async Task Chart4Async_Test1()
    {
        // Arrange

        // Act
        var result = await Connection.Chart4Async();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
