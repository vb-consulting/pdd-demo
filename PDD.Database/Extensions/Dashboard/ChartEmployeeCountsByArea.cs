#pragma warning disable CS8632
// pgroutiner auto-generated code
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Dashboard;

public static class PgRoutineChartEmployeeCountsByArea
{
    public const string Name = "dashboard.chart_employee_counts_by_area";
    public const string Query = $"select {Name}($1)";

    /// <summary>
    /// Executes sql function dashboard.chart_employee_counts_by_area(integer)
    /// Business areas, the number of employees for top 3 companies by highest number of employees.
    /// JSON object where labels are business area names and three series with number of current employees for each area, each searies for one company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>string?</returns>
    public static string? ChartEmployeeCountsByArea(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Integer, Value = (object)limit ?? DBNull.Value }
            },
            AllResultTypesAreUnknown = true
        };
        using var reader = command.ExecuteReader(System.Data.CommandBehavior.SingleResult);
        if (reader.Read())
        {
            var value = reader.GetProviderSpecificValue(0);
            return value == DBNull.Value ? null : (string)value;
        }
        return default;
    }

    /// <summary>
    /// Asynchronously executes sql function dashboard.chart_employee_counts_by_area(integer)
    /// Business areas, the number of employees for top 3 companies by highest number of employees.
    /// JSON object where labels are business area names and three series with number of current employees for each area, each searies for one company.
    /// - Returns JSON schema: `{"labels": [string], "series: [{"data": [number], "label": string}]"}`
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async Task<string?> ChartEmployeeCountsByAreaAsync(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Integer, Value = (object)limit ?? DBNull.Value }
            },
            AllResultTypesAreUnknown = true
        };
        using var reader = await command.ExecuteReaderAsync(System.Data.CommandBehavior.SingleResult);
        if (await reader.ReadAsync())
        {
            var value = reader.GetProviderSpecificValue(0);
            return value == DBNull.Value ? null : (string)value;
        }
        return default;
    }
}
