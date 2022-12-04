#pragma warning disable CS8632
// pgroutiner auto-generated code
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Dashboard;

public static class PgRoutineChartEmployeeCountsByYear
{
    public const string Name = "dashboard.chart_employee_counts_by_year";
    public const string Query = $"select {Name}($1)";

    /// <summary>
    /// Executes plpgsql function dashboard.chart_employee_counts_by_year(integer)
    /// Top companies by number of employees for the last ten years.
    /// JSON object with only one series where labels are last ten years names and values have data for number of employees for each year and label as company name.
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>string?</returns>
    public static string? ChartEmployeeCountsByYear(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
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
    /// Asynchronously executes plpgsql function dashboard.chart_employee_counts_by_year(integer)
    /// Top companies by number of employees for the last ten years.
    /// JSON object with only one series where labels are last ten years names and values have data for number of employees for each year and label as company name.
    /// - Returns JSON: `{labels: string[], series: {data: number[], label: string}[]}`
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async Task<string?> ChartEmployeeCountsByYearAsync(this NpgsqlConnection connection, int? limit, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
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
