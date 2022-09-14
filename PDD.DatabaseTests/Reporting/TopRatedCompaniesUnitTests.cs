// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

///<summary>
/// Test method for sql function reporting.top_rated_companies
///</summary>
public class TopRatedCompaniesUnitTests : PostgreSqlTestDatabaseTransactionFixture
{
    public TopRatedCompaniesUnitTests(PostgreSqlUnitTests tests) : base(tests) { }


    [Fact]
    public void TopRatedCompanies_Test()
    {
        // Arrange
        int? limit = 3;
        var persionId = this.InsertPerson("person1");
        this
            .InsertCompanyWithScoreAndAreas(persionId, "company1", new int[] { 5, 5, 4 }, new string[] { "General", "AI" })
            .InsertCompanyWithScoreAndAreas(persionId, "company2", new int[] { 4, 4, 3 }, new string[] { "Hardware", "Enterprise" })
            .InsertCompanyWithScoreAndAreas(persionId, "company3", new int[] { 3, 3, 2 }, new string[] { "Edtech", "Consumer" })
            .InsertCompanyWithScoreAndAreas(persionId, "company4", new int[] { 2, 2, 1 }, new string[] { "Mobility", "AI" });

        // Act
        var result = Connection.TopRatedCompanies(limit).ToList();

        // Assert
        result.Select(r => new {r.Name, r.Areas, r.Score}).Should().BeEquivalentTo(new object[]
        {
            new { Name = "company1", Areas = new string[]{ "General", "AI" }, Score = 4.67m },
            new { Name = "company2", Areas = new string[]{ "Hardware", "Enterprise" }, Score = 3.67m },
            new { Name = "company3", Areas = new string[]{ "Edtech", "Consumer" }, Score = 2.67m }
        });
    }
}
