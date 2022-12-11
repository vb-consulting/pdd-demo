#pragma warning disable CS8632
// pgroutiner auto-generated code
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Companies;

public static class PgRoutineSearchCountries
{
    public const string Name = "companies.search_countries";
    public const string Query = $"select {Name}($1, $2, $3)";

    /// <summary>
    /// Executes plpgsql function companies.search_countries(character varying, integer, integer)
    /// Search countries by name or iso2 or iso3.
    /// Result is pageable JSON response `{count, data: [...]}`
    /// Data record has value and name suitable for select type controls.
    /// Countries with companies are sorted first by name, followed by null record (separator) and then by countries without companies sorted by name.
    /// </summary>
    /// <param name="search">_search character varying</param>
    /// <param name="skip">_skip integer</param>
    /// <param name="take">_take integer</param>
    /// <returns>string?</returns>
    public static string? SearchCountries(this NpgsqlConnection connection, string? search, int? skip, int? take,
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
    /// Asynchronously executes plpgsql function companies.search_countries(character varying, integer, integer)
    /// Search countries by name or iso2 or iso3.
    /// Result is pageable JSON response `{count, data: [...]}`
    /// Data record has value and name suitable for select type controls.
    /// Countries with companies are sorted first by name, followed by null record (separator) and then by countries without companies sorted by name.
    /// </summary>
    /// <param name="search">_search character varying</param>
    /// <param name="skip">_skip integer</param>
    /// <param name="take">_take integer</param>
    /// <returns>Task whose Result property is string?</returns>
    public static async Task<string?> SearchCountriesAsync(this NpgsqlConnection connection, string? search, int? skip, int? take,
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
