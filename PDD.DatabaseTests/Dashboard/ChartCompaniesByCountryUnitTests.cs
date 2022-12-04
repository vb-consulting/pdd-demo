// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Dashboard;

///<summary>
/// Test method for sql function dashboard.chart_companies_by_country
///
/// Number of companies by country./// JSON object where labels are country names and it only have one series with the number of companies for each country.
/// It show only first 9 countries and 10th is summed together as other. /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`/// 
///</summary>
public class ChartCompaniesByCountryUnitTests : PostgreSqlConfigurationFixture
{
    public ChartCompaniesByCountryUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void ChartCompaniesByCountry_Empty_Json_Test()
    {
        // Arrange
        int limit = 3;

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
        int limit = 3;

        Connection.Execute(@"
            insert into companies (name, country) values
            (@name1, (select code from countries where iso2 = @country1)),
            (@name2, (select code from countries where iso2 = @country2)),
            (@name3, (select code from countries where iso2 = @country3)),
            (@name4, (select code from countries where iso2 = @country4)),
            (@name5, (select code from countries where iso2 = @country5)),
            (@name6, (select code from countries where iso2 = @country6)),
            (@name7, (select code from countries where iso2 = @country7))", new
        {
            name1 = "company1", country1 = "US",
            name2 = "company2", country2 = "US",
            name3 = "company3", country3 = "HR",
            name4 = "company4", country4 = "US",
            name5 = "company5", country5 = "HR",
            name6 = "company6", country6 = "FR",
            name7 = "company7", country7 = "DE",
        });

        // Act
        var result = JsonConvert.DeserializeAnonymousType(Connection.ChartCompaniesByCountry(limit), new 
        { 
            labels = new string[] { }, 
            series = new[] 
            { 
                new 
                { 
                    data = new int[] { }, 
                    label = default(string)
                } 
            } 
        });

        // Assert
        result.labels.Should().BeEquivalentTo(new string[3] { "United States", "Croatia", "Other" });
        result.series.Length.Should().Be(1);
        result.series[0].label.Should().BeNull();
        result.series[0].data.Should().BeEquivalentTo(new int[3] { 3, 2, 2 });
    }
}
