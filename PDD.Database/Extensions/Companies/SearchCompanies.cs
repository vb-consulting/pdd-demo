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

namespace PDD.Database.Extensions.Companies;

public static class PgRoutineSearchCompanies
{
    public const string Name = "companies.search_companies";

    /// <summary>
    /// Executes plpgsql function companies.search_companies(character varying, ARRAY, ARRAY, boolean, integer, integer)
    /// Search companies by search string (name or company line), or by countries or areas selection.
    /// Result is pageable JSON response `{count, data: [...]}`
    /// </summary>
    /// <param name="search">_search character varying</param>
    /// <param name="countries">_countries ARRAY</param>
    /// <param name="areas">_areas ARRAY</param>
    /// <param name="sortAsc">_sort_asc boolean</param>
    /// <param name="skip">_skip integer</param>
    /// <param name="take">_take integer</param>
    /// <returns>string?</returns>
    public static string? SearchCompanies(this NpgsqlConnection connection, string? search, short[]? countries, short[]? areas, bool? sortAsc, int? skip, int? take, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (search, NpgsqlDbType.Varchar),
                (countries, NpgsqlDbType.Array | NpgsqlDbType.Smallint),
                (areas, NpgsqlDbType.Array | NpgsqlDbType.Smallint),
                (sortAsc, NpgsqlDbType.Boolean),
                (skip, NpgsqlDbType.Integer),
                (take, NpgsqlDbType.Integer))
            .Read<string?>($"select {Name}($1, $2, $3, $4, $5, $6)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes plpgsql function companies.search_companies(character varying, ARRAY, ARRAY, boolean, integer, integer)
    /// Search companies by search string (name or company line), or by countries or areas selection.
    /// Result is pageable JSON response `{count, data: [...]}`
    /// </summary>
    /// <param name="search">_search character varying</param>
    /// <param name="countries">_countries ARRAY</param>
    /// <param name="areas">_areas ARRAY</param>
    /// <param name="sortAsc">_sort_asc boolean</param>
    /// <param name="skip">_skip integer</param>
    /// <param name="take">_take integer</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> SearchCompaniesAsync(this NpgsqlConnection connection, string? search, short[]? countries, short[]? areas, bool? sortAsc, int? skip, int? take, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (search, NpgsqlDbType.Varchar),
                (countries, NpgsqlDbType.Array | NpgsqlDbType.Smallint),
                (areas, NpgsqlDbType.Array | NpgsqlDbType.Smallint),
                (sortAsc, NpgsqlDbType.Boolean),
                (skip, NpgsqlDbType.Integer),
                (take, NpgsqlDbType.Integer))
            .ReadAsync<string?>($"select {Name}($1, $2, $3, $4, $5, $6)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefaultAsync();
    }
}
