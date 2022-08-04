#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

public class Chart2UnitTests : PostgreSqlUnitTestFixture
{
    public Chart2UnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    ///<summary>
    /// Test method for plpgsql function reporting.chart_2().
    ///
    /// Top 5 comapnies by number of employees for the last ten years.
    /// Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// 
    ///</summary>
    [Fact]
    public void Chart2_Test1()
    {
        // Arrange

        // Act
        var result = Connection.Chart2();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    ///<summary>
    /// Test method for plpgsql function reporting.chart_2().
    ///
    /// Top 5 comapnies by number of employees for the last ten years.
    /// Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// 
    ///</summary>
    [Fact]
    public async Task Chart2Async_Test1()
    {
        // Arrange

        // Act
        var result = await Connection.Chart2Async();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
