// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Company;

///<summary>
/// Test method for plpgsql function company.company_reviews
///</summary>
public class CompanyReviewsUnitTests : PostgreSqlConfigurationFixture
{
    public CompanyReviewsUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void CompanyReviews_Empty_Test()
    {
        // Arrange
        Guid? id = default;
        int? skip = default;
        int? take = default;

        // Act
        var result = Connection.CompanyReviews(id, skip, take);

        // Assert
        // Assert
        dynamic data = JsonConvert.DeserializeObject(result);
        (data.count is JValue).Should().BeTrue();

        (data.page is JArray).Should().BeTrue();
        ((long)data.count.Value).Should().Be(0);
        ((int)data.page.Count).Should().Be(0);
    }
}
