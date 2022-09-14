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

public static class PgRoutineChartCompaniesByCountry
{
    public const string Name = "reporting.chart_companies_by_country";

    /// <summary>
    /// Executes sql function reporting.chart_companies_by_country(integer)
    /// Number of companies by country.
    /// JSON object where labels are country names and it only have one series with the number of companies for each country.
    /// It show only first 9 countries and 10th is summed together as other. 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>string?</returns>
    public static string? ChartCompaniesByCountry(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
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
    /// Asynchronously executes sql function reporting.chart_companies_by_country(integer)
    /// Number of companies by country.
    /// JSON object where labels are country names and it only have one series with the number of companies for each country.
    /// It show only first 9 countries and 10th is summed together as other. 
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number]}]"}`
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> ChartCompaniesByCountryAsync(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (limit, NpgsqlDbType.Integer))
            .ReadAsync<string?>($"select {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefaultAsync();
    }
}
