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

public static class PgRoutineSearchCountries
{
    public const string Name = "companies.search_countries";

    /// <summary>
    /// Executes plpgsql function companies.search_countries(character varying, integer, integer)
    /// </summary>
    /// <param name="search">_search character varying</param>
    /// <param name="skip">_skip integer</param>
    /// <param name="take">_take integer</param>
    /// <returns>string?</returns>
    public static string? SearchCountries(this NpgsqlConnection connection, string? search, int? skip, int? take, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (search, NpgsqlDbType.Varchar),
                (skip, NpgsqlDbType.Integer),
                (take, NpgsqlDbType.Integer))
            .Read<string?>($"select {Name}($1, $2, $3)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes plpgsql function companies.search_countries(character varying, integer, integer)
    /// </summary>
    /// <param name="search">_search character varying</param>
    /// <param name="skip">_skip integer</param>
    /// <param name="take">_take integer</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> SearchCountriesAsync(this NpgsqlConnection connection, string? search, int? skip, int? take, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (search, NpgsqlDbType.Varchar),
                (skip, NpgsqlDbType.Integer),
                (take, NpgsqlDbType.Integer))
            .ReadAsync<string?>($"select {Name}($1, $2, $3)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefaultAsync();
    }
}
