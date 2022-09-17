// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Dashboard;

///<summary>
/// Test method for sql function dashboard.top_experinced_people
///</summary>
public class TopExperincedPeopleUnitTests : PostgreSqlConfigurationFixture
{
    public TopExperincedPeopleUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void TopExperincedPeople_Test1()
    {
        // Arrange
        int? limit = default;

        // Act
        var result = Connection.TopExperincedPeople(limit).ToList();

        // Assert
        // todo: adjust assert logic template to match actual logic
        //Assert.Equal(default(List<TopExperincedPeopleResult>), result);
    }
}
