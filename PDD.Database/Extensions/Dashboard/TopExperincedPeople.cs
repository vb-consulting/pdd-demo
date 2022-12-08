#pragma warning disable CS8632
// pgroutiner auto-generated code
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Dashboard;

public class TopExperincedPeopleResult
{
    public Guid? Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public int? Age { get; set; }
    public string? Country { get; set; }
    public short? Countrycode { get; set; }
    public string? Countryiso2 { get; set; }
    public int? YearsOfExperience { get; set; }
    public long? NumberOfCompanies { get; set; }
    public string? EmployeeStatus { get; set; }
    public string[]? Roles { get; set; }
}

public static class PgRoutineTopExperincedPeople
{
    public const string Name = "dashboard.top_experinced_people";
    public const string Query = $"select id, first_name, last_name, age, country, countrycode, countryiso2, years_of_experience, number_of_companies, employee_status, roles from {Name}($1)";

    /// <summary>
    /// Executes sql function dashboard.top_experinced_people(integer)
    /// Top experienced people by the years of the working experience.
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>IEnumerable of TopExperincedPeopleResult instances</returns>
    public static IEnumerable<TopExperincedPeopleResult> TopExperincedPeople(this NpgsqlConnection connection, int? limit,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Integer, Value = limit == null ? DBNull.Value : limit }
            },
            UnknownResultTypeList = new bool[] { false, true, true, false, true, false, true, false, false, true, false }
        };
        DatabaseShared.CommandCallback.Run(command, memberName, sourceFilePath, sourceLineNumber);
        if (connection.State != System.Data.ConnectionState.Open)
        {
            connection.Open();
        }
        using var reader = command.ExecuteReader(System.Data.CommandBehavior.Default);
        while (reader.Read())
        {
            object[] values = new object[11];
            reader.GetProviderSpecificValues(values);
            yield return new TopExperincedPeopleResult
            {
                Id = values[0] == DBNull.Value ? null : (Guid)values[0],
                FirstName = values[1] == DBNull.Value ? null : (string)values[1],
                LastName = values[2] == DBNull.Value ? null : (string)values[2],
                Age = values[3] == DBNull.Value ? null : (int)values[3],
                Country = values[4] == DBNull.Value ? null : (string)values[4],
                Countrycode = values[5] == DBNull.Value ? null : (short)values[5],
                Countryiso2 = values[6] == DBNull.Value ? null : (string)values[6],
                YearsOfExperience = values[7] == DBNull.Value ? null : (int)values[7],
                NumberOfCompanies = values[8] == DBNull.Value ? null : (long)values[8],
                EmployeeStatus = values[9] == DBNull.Value ? null : (string)values[9],
                Roles = values[10] == DBNull.Value ? null : (string[])values[10]
            };
        }
    }

    /// <summary>
    /// Asynchronously executes sql function dashboard.top_experinced_people(integer)
    /// Top experienced people by the years of the working experience.
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>IAsyncEnumerable of TopExperincedPeopleResult instances</returns>
    public static async IAsyncEnumerable<TopExperincedPeopleResult> TopExperincedPeopleAsync(this NpgsqlConnection connection, int? limit,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Integer, Value = limit == null ? DBNull.Value : limit }
            },
            UnknownResultTypeList = new bool[] { false, true, true, false, true, false, true, false, false, true, false }
        };
        DatabaseShared.CommandCallback.Run(command, memberName, sourceFilePath, sourceLineNumber);
        if (connection.State != System.Data.ConnectionState.Open)
        {
            await connection.OpenAsync();
        }
        using var reader = await command.ExecuteReaderAsync(System.Data.CommandBehavior.Default);
        while (await reader.ReadAsync())
        {
            object[] values = new object[11];
            reader.GetProviderSpecificValues(values);
            yield return new TopExperincedPeopleResult
            {
                Id = values[0] == DBNull.Value ? null : (Guid)values[0],
                FirstName = values[1] == DBNull.Value ? null : (string)values[1],
                LastName = values[2] == DBNull.Value ? null : (string)values[2],
                Age = values[3] == DBNull.Value ? null : (int)values[3],
                Country = values[4] == DBNull.Value ? null : (string)values[4],
                Countrycode = values[5] == DBNull.Value ? null : (short)values[5],
                Countryiso2 = values[6] == DBNull.Value ? null : (string)values[6],
                YearsOfExperience = values[7] == DBNull.Value ? null : (int)values[7],
                NumberOfCompanies = values[8] == DBNull.Value ? null : (long)values[8],
                EmployeeStatus = values[9] == DBNull.Value ? null : (string)values[9],
                Roles = values[10] == DBNull.Value ? null : (string[])values[10]
            };
        }
    }
}
