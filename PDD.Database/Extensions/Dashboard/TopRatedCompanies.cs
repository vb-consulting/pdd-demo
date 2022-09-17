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

public static class PgRoutineTopRatedCompanies
{
    public const string Name = "dashboard.top_rated_companies";

    /// <summary>
    /// Executes sql function dashboard.top_rated_companies(integer)
    /// Top rated companies by the user score.
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>IEnumerable of TopRatedCompaniesResult instances</returns>
    public static IEnumerable<TopRatedCompaniesResult> TopRatedCompanies(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithParameters(
                (limit, NpgsqlDbType.Integer))
            .Read<TopRatedCompaniesResult>($"select id, name, company_line, country, country_code, areas, score, reviews from {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber);
    }

    /// <summary>
    /// Asynchronously executes sql function dashboard.top_rated_companies(integer)
    /// Top rated companies by the user score.
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>IAsyncEnumerable of TopRatedCompaniesResult instances</returns>
    public static IAsyncEnumerable<TopRatedCompaniesResult> TopRatedCompaniesAsync(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithParameters(
                (limit, NpgsqlDbType.Integer))
            .ReadAsync<TopRatedCompaniesResult>($"select id, name, company_line, country, country_code, areas, score, reviews from {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber);
    }
}
