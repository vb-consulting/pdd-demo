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

public static class PgRoutineChart1
{
    public const string Name = "reporting.chart_1";

    /// <summary>
    /// Executes sql function "chart_1"
    /// Top 10 comapnies by number of current employees.
    /// Json object where lables are companies name with average score included and it only have one series with the number of current employees for each company.
    /// 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// </summary>
    /// <returns>string?</returns>
    public static string? Chart1(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .Read<string?>($"select {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes sql function "chart_1"
    /// Top 10 comapnies by number of current employees.
    /// Json object where lables are companies name with average score included and it only have one series with the number of current employees for each company.
    /// 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// </summary>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> Chart1Async(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .ReadAsync<string?>($"select {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefaultAsync();
    }
}
