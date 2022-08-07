#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

public class Chart6UnitTests : PostgreSqlUnitTestFixture
{
    public Chart6UnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    ///<summary>
    /// Test method for sql function reporting.chart_6(integer).
    ///
    /// Business areas, the number of employees for top 3 companies by highest number of employees.
    /// Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
    /// 
    ///</summary>
    [Fact]
    public void Chart6_Test1()
    {
        // Arrange
        int? limit = default;

        // Act
        var result = Connection.Chart6(limit);

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    ///<summary>
    /// Test method for sql function reporting.chart_6().
    ///
    /// Business areas, the number of employees for top 3 companies by highest number of employees.
    /// Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
    /// 
    ///</summary>
    [Fact]
    public void Chart6_Test2()
    {
        // Arrange

        // Act
        var result = Connection.Chart6();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
