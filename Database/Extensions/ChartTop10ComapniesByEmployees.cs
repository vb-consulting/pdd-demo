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
    /// Json object where lables are companies name and it onyl have one series with the number of current employees for each company.
    /// 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
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
    /// Json object where lables are companies name and it onyl have one series with the number of current employees for each company.
    /// 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
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
