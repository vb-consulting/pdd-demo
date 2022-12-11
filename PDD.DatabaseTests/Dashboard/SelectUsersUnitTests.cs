// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Dashboard;

///<summary>
/// Test method for sql function dashboard.select_users
///</summary>
public class SelectUsersUnitTests : PostgreSqlConfigurationFixture
{
    public SelectUsersUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void SelectUsers_Test1()
    {
        // Arrange

        // Act
        var result = Connection.SelectUsers().ToList();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(List<Users>), result);
    }

    [Fact]
    public async Task SelectUsersAsync_Test1()
    {
        // Arrange

        // Act
        var result = await Connection.SelectUsersAsync().ToListAsync();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(List<Users>), result);
    }
}
