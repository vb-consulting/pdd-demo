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

public static class PgRoutineChartTop10ComapniesByEmployees
{
    public const string Name = "reporting.chart_top_10_comapnies_by_employees";

    /// <summary>
    /// Executes sql function "chart_top_10_comapnies_by_employees"
    /// Top 10 comapnies by number of current employees.
    /// Json object with only one series where labeles are comapnies names and values are number of the current employees.
    /// 
    /// - Returns JSON schema: `{"labels": [string], "series: [[number]]"}`
    /// </summary>
    /// <returns>string?</returns>
    public static string? ChartTop10ComapniesByEmployees(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .Read<string?>($"select {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes sql function "chart_top_10_comapnies_by_employees"
    /// Top 10 comapnies by number of current employees.
    /// Json object with only one series where labeles are comapnies names and values are number of the current employees.
    /// 
    /// - Returns JSON schema: `{"labels": [string], "series: [[number]]"}`
    /// </summary>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> ChartTop10ComapniesByEmployeesAsync(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .ReadAsync<string?>($"select {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefaultAsync();
    }
}
