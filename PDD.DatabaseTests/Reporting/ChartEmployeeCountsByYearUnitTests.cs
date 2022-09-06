// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

///<summary>
/// Test method for plpgsql function reporting.chart_employee_counts_by_year
///
/// Top 5 companies by number of employees for the last ten years.
/// JSON object with only one series where labels are last ten years names and values have data for number of employees for each year and label as company name.
/// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
/// 
///</summary>
public class ChartEmployeeCountsByYearUnitTests : PostgreSqlConfigurationFixture
{
    public ChartEmployeeCountsByYearUnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    [Fact]
    public void ChartEmployeeCountsByYear_Test1()
    {
        // Arrange
        int? limit = default;

        // Act
        var result = Connection.ChartEmployeeCountsByYear(limit);

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    [Fact]
    public async Task ChartEmployeeCountsByYearAsync_Test1()
    {
        // Arrange
        int? limit = default;

        // Act
        var result = await Connection.ChartEmployeeCountsByYearAsync(limit);

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    [Fact]
    public void ChartEmployeeCountsByYear_Test2()
    {
        // Arrange

        // Act
        var result = Connection.ChartEmployeeCountsByYear();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    [Fact]
    public async Task ChartEmployeeCountsByYearAsync_Test2()
    {
        // Arrange

        // Act
        var result = await Connection.ChartEmployeeCountsByYearAsync();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
