// pgroutiner auto-generated code

using PDD.Database.Extensions.Companies;

namespace PDD.DatabaseTests.Companies;

///<summary>
/// Test method for plpgsql function companies.search_companies
///</summary>
public class SearchCompaniesUnitTests : PostgreSqlConfigurationFixture
{
    public SearchCompaniesUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void SearchCompanies_Empty_Json_Test()
    {
        // Arrange
        string? search = null;
        int? skip = 0;
        int? take = 10;

        // Act
        var result = Connection.SearchCompanies(search, skip, take);
        dynamic data = JsonConvert.DeserializeObject(result);

        // Assert
        (data.count is JValue).Should().BeTrue();
        (data.page is JValue).Should().BeTrue();

        ((long)data.count.Value).Should().Be(0);
        ((object)data.page.Value).Should().Be(null);
    }

    [Fact]
    public void SearchCompanies_First_Page_Test()
    {
        // Arrange
        string search = null;
        int? skip = 0;
        int? take = 3;

        var companyIds = Connection.Read<Guid>(@"
            insert into companies (name, country, company_line, about) values
            (@name[1], 840, @name[1] || ' line', @name[1] || ' about'),
            (@name[2], 300, @name[2] || ' line', @name[2] || ' about'),
            (@name[3], 380, @name[3] || ' line', @name[3] || ' about'),
            (@name[4], 191, @name[4] || ' line', @name[4] || ' about'),
            (@name[5], 528, @name[5] || ' line', @name[5] || ' about'),
            (@name[6], 860, @name[6] || ' line', @name[6] || ' about')
            returning id;", new
        {
            name = new string[] { "company1", "company2", "company3", "company4", "company5", "company6" }
        }).ToArray();

        Connection.Execute(@"
            insert into company_areas (company_id, area_id) values 
            
            (@company[2], (select id from business_areas where name_normalized = lower(@area[1]) limit 1)),

            (@company[3], (select id from business_areas where name_normalized = lower(@area[1]) limit 1)),
            (@company[3], (select id from business_areas where name_normalized = lower(@area[2]) limit 1)),
            (@company[3], (select id from business_areas where name_normalized = lower(@area[3]) limit 1))", 
            new
        {
            company = companyIds,
            area = new string[] { "General", "AI", "Hardware" }
        });

        // Act
        var result = JsonConvert.DeserializeAnonymousType(Connection.SearchCompanies(search, skip, take), new
        {
            count = default(int),
            page = new[]
            {
                new
                {
                    id = default(Guid),
                    name = default(string),
                    companyline = default(string),
                    about = default(string),
                    countrycode = default(int),
                    country = default(string),
                    areas = Array.Empty<string>()
                }
            }
        });


        // Assert
        result.count.Should().Be(6);
        result.page.Should().BeEquivalentTo(new[]
        {
            new
            {
                id = companyIds[0],
                name = "company1",
                companyline = "company1 line",
                about = "company1 about",
                countrycode = 840,
                country = "United States",
                areas = new string[] { }
            },
            new
            {
                id = companyIds[1],
                name = "company2",
                companyline = "company2 line",
                about = "company2 about",
                countrycode = 300,
                country = "Greece",
                areas = new string[] { "General" }
            },
            new
            {
                id = companyIds[2],
                name = "company3",
                companyline = "company3 line",
                about = "company3 about",
                countrycode = 380,
                country = "Italy",
                areas = new string[] { "General", "AI", "Hardware" }
            },
        });
    }
}
