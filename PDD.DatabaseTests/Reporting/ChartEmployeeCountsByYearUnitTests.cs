#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

public class ChartEmployeeCountsByYearUnitTests : PostgreSqlConfigurationFixture
{
    public ChartEmployeeCountsByYearUnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    ///<summary>
    /// Test method for plpgsql function reporting.chart_employee_counts_by_year(integer).
    ///
    /// Top 5 comapnies by number of employees for the last ten years.
    /// Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// 
    ///</summary>
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

    ///<summary>
    /// Test method for plpgsql function reporting.chart_employee_counts_by_year().
    ///
    /// Top 5 comapnies by number of employees for the last ten years.
    /// Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// 
    ///</summary>
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
}
