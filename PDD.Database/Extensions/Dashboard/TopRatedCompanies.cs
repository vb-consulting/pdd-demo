#pragma warning disable CS8632
// pgroutiner auto-generated code
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Dashboard;

public static class PgRoutineTopRatedCompanies
{
    public const string Name = "dashboard.top_rated_companies";
    public const string Query = $"select {Name}($1)";

    /// <summary>
    /// Executes sql function dashboard.top_rated_companies(integer)
    /// Top rated companies by the user score.
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>string?</returns>
    public static string? TopRatedCompanies(this NpgsqlConnection connection, int? limit,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Integer, Value = limit == null ? DBNull.Value : limit }
            },
            AllResultTypesAreUnknown = true
        };
        DatabaseShared.CommandCallback.Run(command, memberName, sourceFilePath, sourceLineNumber);
        if (connection.State != System.Data.ConnectionState.Open)
        {
            connection.Open();
        }
        using var reader = command.ExecuteReader(System.Data.CommandBehavior.SingleResult);
        if (reader.Read())
        {
            var value = reader.GetProviderSpecificValue(0);
            return value == DBNull.Value ? null : (string)value;
        }
        return default;
    }

    /// <summary>
    /// Asynchronously executes sql function dashboard.top_rated_companies(integer)
    /// Top rated companies by the user score.
    /// </summary>
    /// <param name="limit">_limit integer</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async Task<string?> TopRatedCompaniesAsync(this NpgsqlConnection connection, int? limit,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Integer, Value = limit == null ? DBNull.Value : limit }
            },
            AllResultTypesAreUnknown = true
        };
        DatabaseShared.CommandCallback.Run(command, memberName, sourceFilePath, sourceLineNumber);
        if (connection.State != System.Data.ConnectionState.Open)
        {
            await connection.OpenAsync();
        }
        using var reader = await command.ExecuteReaderAsync(System.Data.CommandBehavior.SingleResult);
        if (await reader.ReadAsync())
        {
            var value = reader.GetProviderSpecificValue(0);
            return value == DBNull.Value ? null : (string)value;
        }
        return default;
    }
}
