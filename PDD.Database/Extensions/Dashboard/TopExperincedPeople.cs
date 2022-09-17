#pragma warning disable CS8632
// pgroutiner auto-generated code
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Norm;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;
using PDD.Database.Models;

namespace PDD.Database.Extensions.Dashboard;

public static class PgRoutineTopExperincedPeople
{
    public const string Name = "dashboard.top_experinced_people";

    /// <summary>
    /// Executes sql function dashboard.top_experinced_people(integer)
    /// Top experienced people by the years of the working experience.
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>IEnumerable of TopExperincedPeopleResult instances</returns>
    public static IEnumerable<TopExperincedPeopleResult> TopExperincedPeople(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithParameters(
                (limit, NpgsqlDbType.Integer))
            .Read<TopExperincedPeopleResult>($"select id, first_name, last_name, age, country, country_code, years_of_experience, number_of_companies, employee_status, roles from {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber);
    }

    /// <summary>
    /// Asynchronously executes sql function dashboard.top_experinced_people(integer)
    /// Top experienced people by the years of the working experience.
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>IAsyncEnumerable of TopExperincedPeopleResult instances</returns>
    public static IAsyncEnumerable<TopExperincedPeopleResult> TopExperincedPeopleAsync(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithParameters(
                (limit, NpgsqlDbType.Integer))
            .ReadAsync<TopExperincedPeopleResult>($"select id, first_name, last_name, age, country, country_code, years_of_experience, number_of_companies, employee_status, roles from {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber);
    }
}
