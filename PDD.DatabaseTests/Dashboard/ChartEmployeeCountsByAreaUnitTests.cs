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

        // $ pgroutiner --inserts "select id, first_name, last_name from people order by id limit 5;select person_id, role_id from person_roles where person_id in (select id from people order by id limit 5);select company_id, person_id, employment_started_at, employment_ended_at from employee_records where person_id in (select id from people order by id limit 5);select id, name, country from companies where id in (select distinct company_id from employee_records where person_id in (select id from people order by id limit 5))"

        Connection.Execute(@"
        -- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
        INSERT INTO public.companies (id, name, country) VALUES ('f24b9056-bfa7-4390-82a1-95f6542222ee', 'Koch Group', 840);
        INSERT INTO public.companies (id, name, country) VALUES ('e6a47706-b72a-49e3-b868-4ec05f311590', 'Tremblay and Sons', 840);
        INSERT INTO public.companies (id, name, country) VALUES ('2ebd41ab-727a-4847-91ca-69a4abc58156', 'Gibson LLC', 840);
        INSERT INTO public.companies (id, name, country) VALUES ('7d041099-0d68-40c3-bf7d-c9e3d1c624f6', 'Kulas, Watsica and Tillman', 705);
        INSERT INTO public.companies (id, name, country) VALUES ('48edb73c-1acf-483d-8bc8-67bb68d93808', 'Cormier Inc', 608);
        INSERT INTO public.companies (id, name, country) VALUES ('0c98eebf-1a29-4b33-bcb8-7ea854e91df5', 'Gerhold - Gerlach', 320);
        INSERT INTO public.companies (id, name, country) VALUES ('cc8e80eb-bdf9-4cba-86cb-4192468ed078', 'Ortiz Group', 380);
        INSERT INTO public.companies (id, name, country) VALUES ('241af852-f937-48e1-b137-3325ba4f37f2', 'Tromp - Rempel', 442);
        INSERT INTO public.companies (id, name, country) VALUES ('d43ea7bb-6a92-4a35-bb7f-94efc2a97068', 'Murazik, Kuphal and Schuppe', 840);
        INSERT INTO public.companies (id, name, country) VALUES ('8395eaee-1c1b-4ca9-9645-9eea49824bac', 'Toy LLC', 380);
        INSERT INTO public.companies (id, name, country) VALUES ('ae32709a-9d8d-42cb-b38f-b5a36038b14b', 'Goyette - Crona', 56);
        INSERT INTO public.companies (id, name, country) VALUES ('147fd272-f965-4c44-b11e-d8095243416c', 'Macejkovic, Rempel and Bergnaum', 380);
        INSERT INTO public.companies (id, name, country) VALUES ('ecefe502-463c-4535-bd25-c9b5301399e2', 'Harvey, Kuhn and Quigley', 300);
        -- Data for Name: employee_records; Type: TABLE DATA; Schema: public; Owner: postgres
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('48edb73c-1acf-483d-8bc8-67bb68d93808', '000517f1-7288-4fd1-96df-af9e6a78717e', '2007-09-14', '2017-03-14');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('cc8e80eb-bdf9-4cba-86cb-4192468ed078', '000517f1-7288-4fd1-96df-af9e6a78717e', '2017-03-14', '2022-03-14');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('d43ea7bb-6a92-4a35-bb7f-94efc2a97068', '000517f1-7288-4fd1-96df-af9e6a78717e', '2022-03-14', NULL);
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('0c98eebf-1a29-4b33-bcb8-7ea854e91df5', '00040061-68dc-4a71-9e7b-23b1b91f3bb6', '2021-03-24', NULL);
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('f24b9056-bfa7-4390-82a1-95f6542222ee', '0002022a-8f0e-451e-beb2-0b98a1aaf9e4', '1975-12-11', '1988-07-11');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('147fd272-f965-4c44-b11e-d8095243416c', '0002022a-8f0e-451e-beb2-0b98a1aaf9e4', '1988-07-11', '2008-09-11');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('241af852-f937-48e1-b137-3325ba4f37f2', '0002022a-8f0e-451e-beb2-0b98a1aaf9e4', '2008-09-11', NULL);
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('e6a47706-b72a-49e3-b868-4ec05f311590', '00069e6d-8989-429d-8044-14e4fa7a29ce', '1979-07-27', '1981-12-27');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('7d041099-0d68-40c3-bf7d-c9e3d1c624f6', '00069e6d-8989-429d-8044-14e4fa7a29ce', '1981-12-27', '2006-11-27');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('ecefe502-463c-4535-bd25-c9b5301399e2', '00069e6d-8989-429d-8044-14e4fa7a29ce', '2006-11-27', '2011-04-27');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('8395eaee-1c1b-4ca9-9645-9eea49824bac', '00069e6d-8989-429d-8044-14e4fa7a29ce', '2011-04-27', NULL);
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('2ebd41ab-727a-4847-91ca-69a4abc58156', '0002fedc-0e0a-4f1a-898d-c5f51b74f95e', '1999-02-13', '2019-10-13');
        INSERT INTO public.employee_records (company_id, person_id, employment_started_at, employment_ended_at) VALUES ('ae32709a-9d8d-42cb-b38f-b5a36038b14b', '0002fedc-0e0a-4f1a-898d-c5f51b74f95e', '2019-10-13', NULL);
        -- Data for Name: people; Type: TABLE DATA; Schema: public; Owner: postgres
        INSERT INTO public.people (id, first_name, last_name) VALUES ('0002022a-8f0e-451e-beb2-0b98a1aaf9e4', 'Carlosiverson', 'Dibbert');
        INSERT INTO public.people (id, first_name, last_name) VALUES ('0002fedc-0e0a-4f1a-898d-c5f51b74f95e', 'Myronir', 'Bechtelar');
        INSERT INTO public.people (id, first_name, last_name) VALUES ('00040061-68dc-4a71-9e7b-23b1b91f3bb6', 'Kellistazia', 'VonRueden');
        INSERT INTO public.people (id, first_name, last_name) VALUES ('000517f1-7288-4fd1-96df-af9e6a78717e', 'Mandystazia', 'Murphy');
        INSERT INTO public.people (id, first_name, last_name) VALUES ('00069e6d-8989-429d-8044-14e4fa7a29ce', 'Lewisiston', 'Lebsack');
        -- Data for Name: person_roles; Type: TABLE DATA; Schema: public; Owner: postgres
        INSERT INTO public.person_roles (person_id, role_id) VALUES ('000517f1-7288-4fd1-96df-af9e6a78717e', 1);
        INSERT INTO public.person_roles (person_id, role_id) VALUES ('000517f1-7288-4fd1-96df-af9e6a78717e', 16);
        INSERT INTO public.person_roles (person_id, role_id) VALUES ('00040061-68dc-4a71-9e7b-23b1b91f3bb6', 11);
        INSERT INTO public.person_roles (person_id, role_id) VALUES ('0002022a-8f0e-451e-beb2-0b98a1aaf9e4', 2);
        INSERT INTO public.person_roles (person_id, role_id) VALUES ('0002022a-8f0e-451e-beb2-0b98a1aaf9e4', 5);
        INSERT INTO public.person_roles (person_id, role_id) VALUES ('00069e6d-8989-429d-8044-14e4fa7a29ce', 8);
        INSERT INTO public.person_roles (person_id, role_id) VALUES ('00069e6d-8989-429d-8044-14e4fa7a29ce', 9);
        INSERT INTO public.person_roles (person_id, role_id) VALUES ('0002fedc-0e0a-4f1a-898d-c5f51b74f95e', 1);
        INSERT INTO public.person_roles (person_id, role_id) VALUES ('0002fedc-0e0a-4f1a-898d-c5f51b74f95e', 16);
");

        // Act
        var result = JsonConvert.DeserializeObject<ChartResponse>(Connection.ChartEmployeeCountsByArea(limit));

        // Assert
        result.labels.Should().BeEquivalentTo(new string[] { "Product Owner", "Software Development Manager", "Tester" });
        result.series.Should().BeEquivalentTo(new ChartSeries[]
        {
            new ChartSeries(new int[] {1}, "Gerhold - Gerlach"),
            new ChartSeries(new int[] {1,1}, "Goyette - Crona"),
            new ChartSeries(new int[] {1,1}, "Murazik, Kuphal and Schuppe"),
        });
    }
}
