#pragma warning disable CS8632
// pgroutiner auto-generated code
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Norm;
using NpgsqlTypes;
using Npgsql;

namespace PDD.Database.Extensions;

public static class PgRoutineGetChartData
{
    public const string Name = "public.get_chart_data";

    /// <summary>
    /// Executes plpgsql function "get_chart_data"
    /// Returns json with chart data for specified chart type:
    /// - type 1: 
    ///     Top 10 companies with highest number of current employees.
    ///     Label is company name and value is number of current employees.
    /// </summary>
    /// <param name="type">_type smallint</param>
    /// <returns>string?</returns>
    public static string? GetChartData(this NpgsqlConnection connection, short? type)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (type, NpgsqlDbType.Smallint))
            .Read<string?>($"select {Name}($1)")
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes plpgsql function "get_chart_data"
    /// Returns json with chart data for specified chart type:
    /// - type 1: 
    ///     Top 10 companies with highest number of current employees.
    ///     Label is company name and value is number of current employees.
    /// </summary>
    /// <param name="type">_type smallint</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> GetChartDataAsync(this NpgsqlConnection connection, short? type)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (type, NpgsqlDbType.Smallint))
            .ReadAsync<string?>($"select {Name}($1)")
            .SingleOrDefaultAsync();
    }
}
