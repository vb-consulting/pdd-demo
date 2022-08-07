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

public static class PgRoutineChart2
{
    public const string Name = "reporting.chart_2";

    /// <summary>
    /// Executes plpgsql function reporting.chart_2(integer)
    /// Top 5 comapnies by number of employees for the last ten years.
    /// Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>string?</returns>
    public static string? Chart2(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
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
    /// Asynchronously executes plpgsql function reporting.chart_2(integer)
    /// Top 5 comapnies by number of employees for the last ten years.
    /// Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> Chart2Async(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
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
    /// Executes plpgsql function reporting.chart_2()
    /// Top 5 comapnies by number of employees for the last ten years.
    /// Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// </summary>
    /// <returns>string?</returns>
    public static string? Chart2(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .Read<string?>($"select {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes plpgsql function reporting.chart_2()
    /// Top 5 comapnies by number of employees for the last ten years.
    /// Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// </summary>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> Chart2Async(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .ReadAsync<string?>($"select {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefaultAsync();
    }
}
