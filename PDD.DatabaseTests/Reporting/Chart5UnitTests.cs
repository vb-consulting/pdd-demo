#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

public class Chart5UnitTests : PostgreSqlUnitTestFixture
{
    public Chart5UnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    ///<summary>
    /// Test method for sql function reporting.chart_5().
    ///
    /// Top 10 comanies with highest number of user reviews.
    /// Json object where lables are companies names with average score and it only have one series with total number of reviews.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public void Chart5_Test1()
    {
        // Arrange

        // Act
        var result = Connection.Chart5();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    ///<summary>
    /// Test method for sql function reporting.chart_5().
    ///
    /// Top 10 comanies with highest number of user reviews.
    /// Json object where lables are companies names with average score and it only have one series with total number of reviews.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public async Task Chart5Async_Test1()
    {
        // Arrange

        // Act
        var result = await Connection.Chart5Async();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
