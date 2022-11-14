// pgroutiner auto-generated code

using static System.Formats.Asn1.AsnWriter;
using System.ComponentModel.Design;
using System.Xml.Linq;

namespace PDD.DatabaseTests.Dashboard;

///<summary>
/// Test method for sql function dashboard.top_rated_companies
///</summary>
public class TopRatedCompaniesUnitTests : PostgreSqlConfigurationFixture
{
    public TopRatedCompaniesUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void TopRatedCompanies_Test()
    {
        // Arrange
        int limit = 3;
        var personId = Guid.NewGuid();

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

        Connection.Execute(@"
            insert into company_reviews (company_id, person_id, score) 
            values 
            (@company[1], @personId, @score[5]),
            (@company[1], @personId, @score[5]),
            (@company[1], @personId, @score[4]),

            (@company[2], @personId, @score[4]),
            (@company[2], @personId, @score[4]),
            (@company[2], @personId, @score[3]),

            (@company[3], @personId, @score[3]),
            (@company[3], @personId, @score[3]),
            (@company[3], @personId, @score[2]),

            (@company[4], @personId, @score[2]),
            (@company[4], @personId, @score[2]),
            (@company[4], @personId, @score[1])", new 
        { 
            company = companyIds, 
            personId, 
            score = new int[] {1,2,3,4,5} 
        });

        Connection.Execute(@"
            insert into company_areas (company_id, area_id) values 
            (@company[1], (select id from business_areas where lower(name) = lower(@area[1]) limit 1)),
            (@company[1], (select id from business_areas where lower(name) = lower(@area[2]) limit 1)),
            
            (@company[2], (select id from business_areas where lower(name) = lower(@area[3]) limit 1)),
            (@company[2], (select id from business_areas where lower(name) = lower(@area[4]) limit 1)),

            (@company[3], (select id from business_areas where lower(name) = lower(@area[5]) limit 1)),
            (@company[3], (select id from business_areas where lower(name) = lower(@area[6]) limit 1)),

            (@company[4], (select id from business_areas where lower(name) = lower(@area[7]) limit 1)),
            (@company[4], (select id from business_areas where lower(name) = lower(@area[8]) limit 1))", new
        {
            company = companyIds,
            area = new string[] { "General", "AI", "Hardware", "Enterprise", "Edtech", "Consumer", "Mobility", "AI" }
        });

        // Act
        var result = JsonConvert.DeserializeAnonymousType(Connection.TopRatedCompanies(limit), new[]
        {
            new
            {
                name = default(string),
                areas = new[]
                {
                    new
                    {
                        id = default(int),
                        name = default(string)
                    }
                },
                score = default(decimal)
            }
        });

        // Assert
        result.Should().BeEquivalentTo(new[]
        {
            new { name = "company1", areas = new[]{new { id = 1, name = "General" }, new { id = 11, name = "AI" }}, score = 4.67m },
            new { name = "company2", areas = new[]{new { id = 2, name = "Enterprise" }, new { id = 9, name = "Hardware" }}, score = 3.67m },
            new { name = "company3", areas = new[]{ new { id = 12, name = "Edtech" }, new { id = 13, name = "Consumer" }}, score = 2.67m }
        });
    }
}
