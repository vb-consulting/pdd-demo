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
        // $ pgroutiner --inserts "select company_id, person_id, employment_started_at, employment_ended_at from employee_records order by company_id limit 10;select id, name, country from companies where id in (select distinct company_id from employee_records order by company_id limit 10)"
        Connection.Execute(@"
        -- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
        INSERT INTO public.companies (id, name, country) VALUES ('02091ad4-a5ae-4b41-bef0-05c201f82a6e', 'Klocko, Schowalter and Bahringer', 196);
        INSERT INTO public.companies (id, name, country) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', 'Daugherty - McLaughlin', 642);
        INSERT INTO public.companies (id, name, country) VALUES ('0176a46e-6fee-44fc-bf81-2df68c7d8700', 'Champlin, Hauck and Adams', 496);
        INSERT INTO public.companies (id, name, country) VALUES ('00c98a46-375b-43da-a884-0f818ffa6e36', 'Schiller, Gerlach and McLaughlin', 191);
        INSERT INTO public.companies (id, name, country) VALUES ('0291f9e9-28f1-4472-9a60-da9d98527339', 'Ortiz, Sawayn and McCullough', 620);
        INSERT INTO public.companies (id, name, country) VALUES ('011a382d-e8c4-41db-952b-9f4caf221f18', 'Denesik LLC', 196);
        INSERT INTO public.companies (id, name, country) VALUES ('01e6dc71-a307-4f1b-87c2-0c1fb91f8390', 'Dietrich - Carter', 208);
        INSERT INTO public.companies (id, name, country) VALUES ('028b6b9e-4808-473d-94ed-52023f4eb772', 'Mayert, Okuneva and Gusikowski', 528);
        INSERT INTO public.companies (id, name, country) VALUES ('0182cd2a-254c-46e6-b91b-96a500b82b4a', 'Shields, O''Connell and Hayes', 840);
        INSERT INTO public.companies (id, name, country) VALUES ('014686bf-4ba3-4703-b4f1-aca70da89406', 'Schinner, Schultz and MacGyver', 196);
        -- Data for Name: employee_records; Type: TABLE DATA; Schema: public; Owner: postgres
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', '73b9fc01-5fa5-4fb8-9c51-894dd6393a11', '1974-11-19', '1976-11-19');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', '632718a3-895f-4756-b166-9e5af48daa8b', '2021-06-14', NULL);
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', '8a85bd05-c530-4855-8d14-11aa7479343b', '2007-10-29', '2010-08-29');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', '79d9cdf7-9a24-4bf5-a700-78775b6e3895', '2005-10-06', NULL);
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', '150850d9-23d8-4e6e-a19b-a30ee27b1b92', '1999-05-08', '2005-06-08');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', '3ec80f64-dd50-410e-ab4c-197969e1cf90', '2004-07-11', NULL);
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', '066243dc-fc2c-4ddf-aea4-2f1be3b51783', '1991-10-11', '1995-01-11');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', 'b0cefd0c-f2b3-48af-96a7-77acd667fb35', '2007-03-29', '2019-07-29');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', '220be005-7f89-407e-95a0-19f1717ea84a', '2019-06-25', NULL);
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('00c633f8-b654-4d0a-b559-5c8b0d01f361', '2a3e6584-abb8-4e72-8445-c584c2fc54e0', '1967-01-12', '1974-11-12');
        ");

        // Act
        var result = JsonConvert.DeserializeObject<ChartResponse>(Connection.ChartEmployeeCountsByYear(limit));

        //{"labels" : ["2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011"], "series" : [{"data" : [4,3,3,3,3,3,3,3,3,3,3], "label" : "Daugherty - McLaughlin"}]}

        // Assert
        result.labels.Should().BeEquivalentTo(new string[] { "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011" });
        result.series.Should().BeEquivalentTo(new ChartSeries[]
        {
            new ChartSeries(new int[] {4,3,3,3,3,3,3,3,3,3,3}, "Daugherty - McLaughlin"),
        });
    }
}
