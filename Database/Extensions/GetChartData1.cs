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

public static class PgRoutineGetChartData1
{
    public const string Name = "reporting.get_chart_data_1";

    /// <summary>
    /// Executes sql function "get_chart_data_1"
    /// Top 10 comapnies by number of current employees.
    /// Json object witjh one series where labeles are comapnis names and values are number of current employees.
    /// </summary>
    /// <returns>string?</returns>
    public static string? GetChartData1(this NpgsqlConnection connection)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .Read<string?>($"select {Name}()")
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes sql function "get_chart_data_1"
    /// Top 10 comapnies by number of current employees.
    /// Json object witjh one series where labeles are comapnis names and values are number of current employees.
    /// </summary>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> GetChartData1Async(this NpgsqlConnection connection)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .ReadAsync<string?>($"select {Name}()")
            .SingleOrDefaultAsync();
    }
}
