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

namespace PDD.Database.Extensions;

public static class PgRoutineTopRatedCompanies
{
    public const string Name = "reporting.top_rated_companies";

    /// <summary>
    /// Executes sql function reporting.top_rated_companies(integer)
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>IEnumerable of TopRatedCompany instances</returns>
    public static IEnumerable<TopRatedCompany> TopRatedCompanies(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithParameters(
                (limit, NpgsqlDbType.Integer))
            .Read<TopRatedCompany>($"select id, name, company_line, country, areas, score, reviews from {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber);
    }

    /// <summary>
    /// Asynchronously executes sql function reporting.top_rated_companies(integer)
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>IAsyncEnumerable of TopRatedCompany instances</returns>
    public static IAsyncEnumerable<TopRatedCompany> TopRatedCompaniesAsync(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithParameters(
                (limit, NpgsqlDbType.Integer))
            .ReadAsync<TopRatedCompany>($"select id, name, company_line, country, areas, score, reviews from {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber);
    }
}
