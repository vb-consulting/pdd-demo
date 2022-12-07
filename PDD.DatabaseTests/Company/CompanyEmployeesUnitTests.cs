// pgroutiner auto-generated code

using PDD.Database.Extensions.Company;

namespace PDD.DatabaseTests.Company;

///<summary>
/// Test method for sql function company.company_employees
///</summary>
public class CompanyEmployeesUnitTests : PostgreSqlConfigurationFixture
{
    public CompanyEmployeesUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void CompanyEmployees_Test1()
    {
        // Arrange
        Guid? id = default;

        // Act
        var result = Connection.CompanyEmployees(id);

        // Assert
        // todo: adjust assert logic template to match actual logic
        // Assert.Equal(default(string?), result);
    }

    [Fact]
    public async Task CompanyEmployeesAsync_Test1()
    {
        // Arrange
        Guid? id = default;

        // Act
        var result = await Connection.CompanyEmployeesAsync(id);

        // Assert
        // todo: adjust assert logic template to match actual logic
        // Assert.Equal(default(string?), result);
    }
}
