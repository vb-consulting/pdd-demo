// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Dashboard;

///<summary>
/// Test method for sql function dashboard.chart_companies_by_country
///
/// Number of companies by country./// JSON object where labels are country names and it only have one series with the number of companies for each country./// It show only first 9 countries and 10th is summed together as other. /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`/// 
///</summary>
public class ChartCompaniesByCountryUnitTests : PostgreSqlConfigurationFixture
{
    public ChartCompaniesByCountryUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void ChartCompaniesByCountry_Empty_Json_Test()
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

    [Fact]
    public void ChartCompaniesByCountry_Report_Test()
    {
        // Arrange
        int? limit = 3;

        this.InsertCompanies(
            ("company1", "US"), ("company2", "HR"),
            ("company3", "US"), ("company4", "HR"),
            ("company5", "FR"), ("company6", "DE"));

        // Act
        var result = JsonConvert.DeserializeObject<ChartResponse>(Connection.ChartCompaniesByCountry(limit));

        // Assert
        result.labels.Should().BeEquivalentTo(new string[3] { "Croatia", "United States", "Other" });
        result.series.Length.Should().Be(1);
        result.series[0].label.Should().BeNull();
        result.series[0].data.Should().BeEquivalentTo(new int[3] { 2, 2, 2 });
    }
}
