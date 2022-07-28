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

public static class PgRoutineChartTopComapniesLast10YearsNumberOfEmployees
{
    public const string Name = "reporting.chart_top_comapnies_last_10_years_number_of_employees";

    /// <summary>
    /// Executes plpgsql function "chart_top_comapnies_last_10_years_number_of_employees"
    /// Top 5 comapnies by number of employees for the last ten years.
    /// Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
    /// 
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// </summary>
    /// <returns>string?</returns>
    public static string? ChartTopComapniesLast10YearsNumberOfEmployees(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .Read<string?>($"select {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes plpgsql function "chart_top_comapnies_last_10_years_number_of_employees"
    /// Top 5 comapnies by number of employees for the last ten years.
    /// Json object with only one series where labeles are last ten years names and values have data for number of employees for each year and label as company name.
    /// 
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// </summary>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> ChartTopComapniesLast10YearsNumberOfEmployeesAsync(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .ReadAsync<string?>($"select {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefaultAsync();
    }
}
