// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Companies;

///<summary>
/// Test method for sql function companies.business_areas
///
/// select value and name from business_areas
///</summary>
public class BusinessAreasUnitTests : PostgreSqlConfigurationFixture
{
    public BusinessAreasUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void BusinessAreas_Test1()
    {
        // Arrange

        // Act
        var result = Connection.BusinessAreas().ToList();

        // Assert
        result.Count.Should().Be(13);
    }
}
