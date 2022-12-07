// pgroutiner auto-generated code

using PDD.Database.Extensions.Company;

namespace PDD.DatabaseTests.Company;

///<summary>
/// Test method for sql function company.company_details
///</summary>
public class CompanyDetailsUnitTests : PostgreSqlConfigurationFixture
{
    public CompanyDetailsUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void CompanyDetails_Null_Test()
    {
        // Arrange
        Guid? id = default;

        // Act
        var result = Connection.CompanyDetails(id);

        // Assert
        result.Should().BeNull();
    }


    [Fact]
    public void CompanyDetails_None_Existing_Test()
    {
        // Arrange
        Guid? id = Guid.NewGuid();

        // Act
        var result = Connection.CompanyDetails(id);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public void CompanyDetails_Existing_Test()
    {
        // Arrange
        Guid? id = Connection.Read<Guid>(@"
            insert into companies (name, web, linkedin, twitter, company_line, about, country) values
            ('name', 'web', 'linkedin', 'twitter', 'company_line', 'about', 191)
            returning id;"
        ).Single();

        // Act
        var result = JsonConvert.DeserializeAnonymousType(Connection.CompanyDetails(id), new
        {
            id = default(string),
            name = default(string),
            web = default(string),
            linkedin = default(string),
            twitter = default(string),
            companyline = default(string),
            about = default(string),
            countrycode = default(int),
            countryiso2 = default(string),
            country = default(string),
            createdby = default(string),
            modifiedby = default(string),
        });

        // Assert
        result.Should().BeEquivalentTo(new
        {
            id = id.ToString(),
            name = "name",
            web = "web",
            linkedin = "linkedin",
            twitter = "twitter",
            companyline = "company_line",
            about = "about",
            countrycode = 191,
            countryiso2 = "HR",
            country = "Croatia",
            createdby = "system",
            modifiedby = "system",
        });
    }
}
