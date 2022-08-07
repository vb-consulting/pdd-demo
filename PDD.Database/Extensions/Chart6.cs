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

namespace PDD.Database.Extensions;

public static class PgRoutineChart6
{
    public const string Name = "reporting.chart_6";

    /// <summary>
    /// Executes sql function reporting.chart_6(integer)
    /// Business areas, the number of employees for top 3 companies by highest number of employees.
    /// Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>string?</returns>
    public static string? Chart6(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (limit, NpgsqlDbType.Integer))
            .Read<string?>($"select {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes sql function reporting.chart_6(integer)
    /// Business areas, the number of employees for top 3 companies by highest number of employees.
    /// Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> Chart6Async(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (limit, NpgsqlDbType.Integer))
            .ReadAsync<string?>($"select {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefaultAsync();
    }

    /// <summary>
    /// Executes sql function reporting.chart_6()
    /// Business areas, the number of employees for top 3 companies by highest number of employees.
    /// Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
    /// </summary>
    /// <returns>string?</returns>
    public static string? Chart6(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .Read<string?>($"select {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes sql function reporting.chart_6()
    /// Business areas, the number of employees for top 3 companies by highest number of employees.
    /// Json object where lables are business area names and three series with number of current employees for each area, each searies for one company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
    /// </summary>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> Chart6Async(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .ReadAsync<string?>($"select {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefaultAsync();
    }
}
