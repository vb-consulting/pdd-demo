#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

public class ChartEmployeeCountsByAreaUnitTests : PostgreSqlConfigurationFixture
{
    public ChartEmployeeCountsByAreaUnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    ///<summary>
    /// Test method for sql function reporting.chart_employee_counts_by_area(integer).
    ///
    /// Business areas, the number of employees for top 3 companies by highest number of employees.
    /// Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
    /// 
    ///</summary>
    [Fact]
    public void ChartEmployeeCountsByArea_Test1()
    {
        // Arrange
        int? limit = default;

        // Act
        var result = Connection.ChartEmployeeCountsByArea(limit);

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    ///<summary>
    /// Test method for sql function reporting.chart_employee_counts_by_area().
    ///
    /// Business areas, the number of employees for top 3 companies by highest number of employees.
    /// Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
    /// 
    ///</summary>
    [Fact]
    public void ChartEmployeeCountsByArea_Test2()
    {
        // Arrange

        // Act
        var result = Connection.ChartEmployeeCountsByArea();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
