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
    public void CompanyEmployees_None_Existing()
    {
        // Arrange
        Guid? id = default;

        // Act
        var result = Connection.CompanyEmployees(id);

        // Assert
        Assert.Equal("[]", result);
    }


    [Fact]
    public void CompanyEmployees_Existing()
    {
        // Arrange
        Guid? id = Guid.NewGuid();

        var personIds = Connection.Read<Guid>(@"
            insert into people (first_name, last_name, country, employee_status) values
            (@name[1], 'last ' || @name[1], 191, (select id from employee_status where lower(name) = @status[1] limit 1)),
            (@name[2], 'last ' || @name[2], 191, (select id from employee_status where lower(name) = @status[2] limit 1))
            returning id;", new
        {
            name = new string[] { "name1", "name2" },
            status = new string[] { "employed", "unemployable" }
        }).ToArray();

        Connection.Execute(@"
            insert into person_roles
            (person_id, role_id) values
            (@person[1], 1),
            (@person[1], 2),
            (@person[2], 1),
            (@person[2], 2)
        ", new
        {
            person = personIds,
        });
        
        Connection.Execute(@"
            insert into employee_records 
            (company_id,    person_id,  employment_started_at, employment_ended_at) values
            (@company,      @person[1], @date[1],              null),
            (@company,      @person[1], @date[1],              @date[2]),
            (@company,      @person[1], @date[1],              @date[3]),
            (@company,      @person[2], @date[1],              null),
            (@company,      @person[2], @date[1],              @date[2]),
            (@company,      @person[2], @date[1],              @date[3])
        ", new
        {
            company = id,
            person = personIds,
            date = new DateTime[]
            {
                DateTime.Now.AddDays(-2),
                DateTime.Now.AddDays(+2),
                DateTime.Now.AddDays(-1),
            }
        });

        // Act
        var result = JsonConvert.DeserializeAnonymousType(Connection.CompanyEmployees(id), new[]
        {
            new
            {
                firstname = default(string),
                lastname = default(string),
                years = default(int?),
                age = default(int?),
                countrycode = default(int?),
                countryiso2 = default(string),
                country = default(string),
                roles = new string[0],
                types = new string[0],
            }
        });

        // Assert
        result.Should().BeEquivalentTo(new[]
        {
            new
            {
                firstname = "name1",
                lastname = "last name1",
                years = 0,
                age = (int?)null,
                countrycode = 191,
                countryiso2 = "HR",
                country = "Croatia",
                roles = new string[] { "Product Owner", "Project Manager" },
                types = new string[] { "Managerial" },
            }
        });
    }
}
