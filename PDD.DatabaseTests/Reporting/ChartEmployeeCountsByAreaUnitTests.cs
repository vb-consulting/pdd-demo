// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

///<summary>
/// Test method for sql function reporting.chart_employee_counts_by_area
///
/// Business areas, the number of employees for top 3 companies by highest number of employees.
/// JSON object where labels are business area names and three series with number of current employees for each area, each searies for one company.
/// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
/// 
///</summary>
public class ChartEmployeeCountsByAreaUnitTests : PostgreSqlConfigurationFixture
{
    public ChartEmployeeCountsByAreaUnitTests(PostgreSqlFixture fixture) : base(fixture) { }

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

    [Fact]
    public async Task ChartEmployeeCountsByAreaAsync_Test1()
    {
        // Arrange
        int? limit = default;

        // Act
        var result = await Connection.ChartEmployeeCountsByAreaAsync(limit);

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

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

    [Fact]
    public async Task ChartEmployeeCountsByAreaAsync_Test2()
    {
        // Arrange

        // Act
        var result = await Connection.ChartEmployeeCountsByAreaAsync();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
