// pgroutiner auto-generated code

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace PDD.DatabaseTests.Reporting;

public class ChartCompaniesByCountryUnitTests : PostgreSqlTestDatabaseFixture
{
    public ChartCompaniesByCountryUnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    ///<summary>
    /// Test method for sql function reporting.chart_companies_by_country(integer).
    ///
    /// Number of companies by country.
    /// Json object where lables are country names and it only have one series with the number of companies for each country.
    /// It show only first 9 conutries and 10th is summed together as other. 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// 
    ///</summary>
    [Fact]
    public void ChartCompaniesByCountry_Empty_Companies_Table_Test1()
    {
        // Arrange
        int? limit = 3;

        // Act
        var result = Connection.ChartCompaniesByCountry(limit);
        dynamic data = JsonConvert.DeserializeObject(result);

        // Assert
        (data.labels is JArray).Should().BeTrue();
        ((int)data.labels.Count).Should().Be(1);
        ((string)data.labels[0].Value).Should().Be("Other");

        (data.series is JArray).Should().BeTrue();
        ((int)data.series.Count).Should().Be(1);
        (data.series[0] is JObject).Should().BeTrue();
        (data.series[0].data is JArray).Should().BeTrue();
        ((int)data.series[0].data.Count).Should().Be(1);
        ((int)data.series[0].data[0].Value).Should().Be(0);
    }
}
