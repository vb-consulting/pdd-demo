#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

public class Chart1UnitTests : PostgreSqlUnitTestFixture
{
    public Chart1UnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    ///<summary>
    /// Test method for sql function reporting.chart_1().
    ///
    /// Top 10 comapnies by number of current employees.
    /// Json object where lables are companies name with average score included and it only have one series with the number of current employees for each company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public void Chart1_Test1()
    {
        // Arrange

        // Act
        var result = Connection.Chart1();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    ///<summary>
    /// Test method for sql function reporting.chart_1().
    ///
    /// Top 10 comapnies by number of current employees.
    /// Json object where lables are companies name with average score included and it only have one series with the number of current employees for each company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public async Task Chart1Async_Test1()
    {
        // Arrange

        // Act
        var result = await Connection.Chart1Async();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
