#pragma warning disable CS8632
// pgroutiner auto-generated code
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Companies;

public static class PgRoutineSearchCompanies
{
    public const string Name = "companies.search_companies";
    public const string Query = $"select {Name}($1, $2, $3, $4, $5, $6)";

    /// <summary>
    /// Executes plpgsql function companies.search_companies(character varying, ARRAY, ARRAY, boolean, integer, integer)
    /// Search companies by search string (name or company line), or by countries or areas selection.
    /// Result is pageable JSON response `{count, data: [...]}`
    /// </summary>
    /// <param name="search">_search character varying</param>
    /// <param name="countries">_countries ARRAY</param>
    /// <param name="areas">_areas ARRAY</param>
    /// <param name="sortAsc">_sort_asc boolean</param>
    /// <param name="skip">_skip integer</param>
    /// <param name="take">_take integer</param>
    /// <returns>string?</returns>
    public static string? SearchCompanies(this NpgsqlConnection connection, string? search, short[]? countries, short[]? areas, bool? sortAsc, int? skip, int? take,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Varchar, Value = search == null ? DBNull.Value : search },
                new() { NpgsqlDbType = NpgsqlDbType.Array | NpgsqlDbType.Smallint, Value = countries == null ? DBNull.Value : countries },
                new() { NpgsqlDbType = NpgsqlDbType.Array | NpgsqlDbType.Smallint, Value = areas == null ? DBNull.Value : areas },
                new() { NpgsqlDbType = NpgsqlDbType.Boolean, Value = sortAsc == null ? DBNull.Value : sortAsc },
                new() { NpgsqlDbType = NpgsqlDbType.Integer, Value = skip == null ? DBNull.Value : skip },
                new() { NpgsqlDbType = NpgsqlDbType.Integer, Value = take == null ? DBNull.Value : take }
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
    /// Asynchronously executes plpgsql function companies.search_companies(character varying, ARRAY, ARRAY, boolean, integer, integer)
    /// Search companies by search string (name or company line), or by countries or areas selection.
    /// Result is pageable JSON response `{count, data: [...]}`
    /// </summary>
    /// <param name="search">_search character varying</param>
    /// <param name="countries">_countries ARRAY</param>
    /// <param name="areas">_areas ARRAY</param>
    /// <param name="sortAsc">_sort_asc boolean</param>
    /// <param name="skip">_skip integer</param>
    /// <param name="take">_take integer</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async Task<string?> SearchCompaniesAsync(this NpgsqlConnection connection, string? search, short[]? countries, short[]? areas, bool? sortAsc, int? skip, int? take,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Varchar, Value = search == null ? DBNull.Value : search },
                new() { NpgsqlDbType = NpgsqlDbType.Array | NpgsqlDbType.Smallint, Value = countries == null ? DBNull.Value : countries },
                new() { NpgsqlDbType = NpgsqlDbType.Array | NpgsqlDbType.Smallint, Value = areas == null ? DBNull.Value : areas },
                new() { NpgsqlDbType = NpgsqlDbType.Boolean, Value = sortAsc == null ? DBNull.Value : sortAsc },
                new() { NpgsqlDbType = NpgsqlDbType.Integer, Value = skip == null ? DBNull.Value : skip },
                new() { NpgsqlDbType = NpgsqlDbType.Integer, Value = take == null ? DBNull.Value : take }
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
