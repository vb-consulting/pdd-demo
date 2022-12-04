// pgroutiner auto-generated code

namespace PDD.DatabaseTests.Dashboard;

///<summary>
/// Test method for sql function dashboard.top_experinced_people
///
/// Top experienced people by the years of the working experience.
///</summary>
public class TopExperincedPeopleUnitTests : PostgreSqlConfigurationFixture
{
    public TopExperincedPeopleUnitTests(PostgreSqlUnitTests tests) : base(tests) { }

    [Fact]
    public void TopExperincedPeople_Test1()
    {
        // Arrange
        int limit = 4;

        var personIds = Connection.Read<Guid>(@"
            insert into people (first_name, last_name, employee_status) values
            (@name[1], 'last ' || @name[1], (select id from employee_status where lower(name) = @status[3] limit 1)),
            (@name[2], 'last ' || @name[2], (select id from employee_status where lower(name) = @status[4] limit 1)),
            (@name[3], 'last ' || @name[3], (select id from employee_status where lower(name) = @status[5] limit 1)),
            (@name[4], 'last ' || @name[4], (select id from employee_status where lower(name) = @status[6] limit 1)),
            (@name[5], 'last ' || @name[5], (select id from employee_status where lower(name) = @status[2] limit 1)),
            (@name[6], 'last ' || @name[6], (select id from employee_status where lower(name) = @status[1] limit 1))
            returning id;", new
        {
            name = new string[] { "name1", "name2", "name3", "name4", "name5", "name6" },
            status = new string[] { "employed", "unemployed", "open to opportunity", "actively applying", "retired", "unemployable" }
        }).ToArray();

        var date = new DateTime(2022, 1, 1);
        Connection.Execute(@"
            insert into employee_records (company_id, person_id, employment_started_at, employment_ended_at) values
            (@company[1], @person[1], @date[1], null),
            (@company[2], @person[2], @date[2], null),
            (@company[3], @person[3], @date[3], null),
            (@company[4], @person[4], @date[4], null),
            (@company[5], @person[5], @date[5], null),
            (@company[6], @person[6], @date[6], null)", new
        {
            company = new Guid[6].Select(_ => Guid.NewGuid()).ToArray(),
            person = personIds,
            date = new DateTime[10].Select((_, index) => date.AddYears(-index)).Reverse().ToArray(),
        });

        // Act
        var result = Connection.TopExperincedPeople(limit).ToList();

        // Assert
        result.Select(e => new { e.FirstName, e.LastName, e.EmployeeStatus }).Should().BeEquivalentTo(new[]
        {
            new { FirstName = "name1", LastName = "last name1", EmployeeStatus = "Open to opportunity" },
            new { FirstName = "name2", LastName = "last name2", EmployeeStatus = "Actively applying" },
            new { FirstName = "name5", LastName = "last name5", EmployeeStatus = "Unemployed" },
            new { FirstName = "name6", LastName = "last name6", EmployeeStatus = "Employed" },
        });
    }
}
