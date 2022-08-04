#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

public class Chart3UnitTests : PostgreSqlUnitTestFixture
{
    public Chart3UnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    ///<summary>
    /// Test method for sql function reporting.chart_3().
    ///
    /// Number of companies by business area.
    /// Json object where lables are companies name and it only have one series with the number of business area for each company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public void Chart3_Test1()
    {
        // Arrange

        // Act
        var result = Connection.Chart3();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    ///<summary>
    /// Test method for sql function reporting.chart_3().
    ///
    /// Number of companies by business area.
    /// Json object where lables are companies name and it only have one series with the number of business area for each company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public async Task Chart3Async_Test1()
    {
        // Arrange

        // Act
        var result = await Connection.Chart3Async();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
