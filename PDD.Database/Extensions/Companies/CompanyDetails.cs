#pragma warning disable CS8632
// pgroutiner auto-generated code
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Companies;

public static class PgRoutineCompanyDetails
{
    public const string Name = "companies.company_details";
    public const string Query = $"select {Name}($1)";

    /// <summary>
    /// Executes sql function companies.company_details(uuid)
    /// </summary>
    /// <param name="id">_id uuid</param>
    /// <returns>string?</returns>
    public static string? CompanyDetails(this NpgsqlConnection connection, Guid? id,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Uuid, Value = id == null ? DBNull.Value : id }
            },
            AllResultTypesAreUnknown = true
        };
        CommandCallback.Run(command, memberName, sourceFilePath, sourceLineNumber);
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
    /// Asynchronously executes sql function companies.company_details(uuid)
    /// </summary>
    /// <param name="id">_id uuid</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async Task<string?> CompanyDetailsAsync(this NpgsqlConnection connection, Guid? id,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Uuid, Value = id == null ? DBNull.Value : id }
            },
            AllResultTypesAreUnknown = true
        };
        CommandCallback.Run(command, memberName, sourceFilePath, sourceLineNumber);
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
