#pragma warning disable CS8632
// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Reporting;

public class Chart1UnitTests : PostgreSqlUnitTestFixture
{
    public Chart1UnitTests(PostgreSqlFixture fixture) : base(fixture) { }

    [Fact]
    public void Chart1_Test1()
    {
        // Arrange

        // Act
        var result = Connection.Chart1();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    [Fact]
    public void Chart1_Test2()
    {
        // Arrange

        // Act
        var result = Connection.Chart1();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }

    [Fact]
    public async Task Chart1Async_Test1()
    {
        // Arrange

        // Act
        var result = await Connection.Chart1Async();

        // Assert
        // todo: adjust assert logic template to match actual logic
        Assert.Equal(default(string?), result);
    }
}
