// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Dashboard;

///<summary>
/// Test method for plpgsql function dashboard.chart_employee_counts_by_year
///
/// Top 5 companies by number of employees for the last ten years./// JSON object with only one series where labels are last ten years names and values have data for number of employees for each year and label as company name./// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`/// 
///</summary>
public class ChartEmployeeCountsByYearUnitTests : PostgreSqlConfigurationFixture
{
    public ChartEmployeeCountsByYearUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void ChartEmployeeCountsByYear_Empty_Json_Test()
    {
        // Arrange
        int? limit = 3;

        // Act
        var result = Connection.ChartEmployeeCountsByYear(limit);
        dynamic data = JsonConvert.DeserializeObject(result);

        // Assert
        (data.labels is JArray).Should().BeTrue();
        ((int)data.labels.Count).Should().Be(0);

        (data.series is JArray).Should().BeTrue();
        ((int)data.series.Count).Should().Be(0);
    }

    [Fact]
    public void ChartEmployeeCountsByYear_Report_Test()
    {
        // Arrange
        int? limit = 3;

        var companyIds = Connection.Read<Guid>(@"
            insert into companies (name, country) values
            (@name[1], 0),
            (@name[2], 0),
            (@name[3], 0),
            (@name[4], 0),
            (@name[5], 0),
            (@name[6], 0)
            returning id;", new
        {
            name = new string[] { "company1", "company2", "company3", "company4", "company5", "company6" }
        }).ToArray();

        var date = new DateTime(2022, 1, 1);
        Connection.Execute(@"
            insert into employee_records (company_id, person_id, employment_started_at, employment_ended_at) values
            (@company[1], @person[1], @date[1], null),
            (@company[1], @person[2], @date[1], null),
            (@company[1], @person[3], @date[1], null),
            (@company[1], @person[4], @date[2], null),
            (@company[1], @person[5], @date[2], null),
            (@company[1], @person[7], @date[3], null),
            (@company[1], @person[8], @date[4], null),
            (@company[1], @person[9], @date[5], null),
            (@company[1], @person[10], @date[6], null),
            (@company[1], @person[11], @date[7], null),

            (@company[2], @person[12], @date[1], null),
            (@company[2], @person[13], @date[1], null),
            (@company[2], @person[14], @date[2], null),
            (@company[2], @person[15], @date[3], null),

            (@company[3], @person[16], @date[1], null),
            (@company[3], @person[17], @date[2], null),
            (@company[3], @person[18], @date[3], null),

            (@company[4], @person[19], @date[1], null),
            (@company[4], @person[20], @date[1], null),

            (@company[5], @person[21], @date[1], null)", new
        {
            company = companyIds,
            person = new Guid[21].Select(_ => Guid.NewGuid()).ToArray(),
            date = new DateTime[10].Select((_, index) => date.AddYears(-index)).ToArray(),
        });

        // Act
        var result = JsonConvert.DeserializeAnonymousType(Connection.ChartEmployeeCountsByYear(limit), new
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
        result.labels.Should().BeEquivalentTo(new string[] { "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013" });
        result.series.Should().BeEquivalentTo(new[]
{
            new { data = new int[] {3, 2, 1, 1, 1, 1, 1, 0, 0, 0}, label = "company1" },
            new { data = new int[] {2, 1, 1, 0, 0, 0, 0, 0, 0, 0}, label = "company2" },
            new { data = new int[] {1, 1, 1, 0, 0, 0, 0, 0, 0, 0}, label = "company3" }
        });
    }
}
