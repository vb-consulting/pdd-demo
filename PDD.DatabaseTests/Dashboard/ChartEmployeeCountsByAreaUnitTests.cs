// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Dashboard;

///<summary>
/// Test method for sql function dashboard.chart_employee_counts_by_area
///
/// Business areas, the number of employees for top 3 companies by highest number of employees./// JSON object where labels are business area names and three series with number of current employees for each area, each searies for one company./// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`/// 
///</summary>
public class ChartEmployeeCountsByAreaUnitTests : PostgreSqlConfigurationFixture
{
    public ChartEmployeeCountsByAreaUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void ChartEmployeeCountsByArea_Empty_Json_Test()
    {
        // Arrange
        int? limit = 3;

        // Act
        var result = Connection.ChartEmployeeCountsByArea(limit);
        dynamic data = JsonConvert.DeserializeObject(result);

        // Assert
        (data.labels is JArray).Should().BeTrue();
        ((int)data.labels.Count).Should().Be(0);

        (data.series is JArray).Should().BeTrue();
        ((int)data.series.Count).Should().Be(0);
    }

    [Fact]
    public void ChartEmployeeCountsByArea_Report_Test()
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

        var personIds = new Guid[10].Select(g => Guid.NewGuid()).ToArray();

        Connection.Execute(@"
            insert into employee_records (company_id, person_id, employment_started_at, employment_ended_at) values
            (@company[1], @person[1], @date1, null),
            (@company[1], @person[2], @date1, null),
            (@company[1], @person[3], @date1, null),

            (@company[2], @person[4], @date1, null),
            (@company[2], @person[5], @date1, null),

            (@company[3], @person[6], @date1, null),

            (@company[4], @person[7], @date1, @date2)", new
        {
            company = companyIds,
            person = personIds,
            date1 = DateTime.Now.AddDays(-2),
            date2 = DateTime.Now.AddDays(-1)
        });

        Connection.Execute(@"
            insert into person_roles (person_id, role_id) values
            (@person[1], (select id from business_roles where name_normalized = @roles[1])),
            (@person[2], (select id from business_roles where name_normalized = @roles[1])),
            (@person[3], (select id from business_roles where name_normalized = @roles[2])),

            (@person[4], (select id from business_roles where name_normalized = @roles[3])),
            (@person[5], (select id from business_roles where name_normalized = @roles[4])),
            
            (@person[6], (select id from business_roles where name_normalized = @roles[5]))", new
        {
            person = personIds,
            roles = new string[] { "tester", "devops", "ux designer", "ui designer", "qa lead" },
        });

        // Act
        var result = JsonConvert.DeserializeObject<ChartResponse>(Connection.ChartEmployeeCountsByArea(limit));

        // Assert
        result.labels.Should().BeEquivalentTo(new string[] { "Devops", "QA Lead", "Tester", "UI Designer", "UX Designer" });
        result.series.Should().BeEquivalentTo(new ChartSeries[]
        {
            new ChartSeries(new int[] {1,0,2,0,0}, "company1"),
            new ChartSeries(new int[] {0,0,0,1,1}, "company2"),
            new ChartSeries(new int[] {0,1,0,0,0}, "company3"),
        });
    }
}
