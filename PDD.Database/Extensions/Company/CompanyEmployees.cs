// pgroutiner auto-generated code
#pragma warning disable CS8632
#pragma warning disable CS8618
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Company;

public static class PgRoutineCompanyEmployees
{
    public const string Name = "company.company_employees";
    public const string Query = $"select {Name}($1)";

    /// <summary>
    /// Executes sql function company.company_employees(uuid)
    /// </summary>
    /// <param name="id">_id uuid</param>
    /// <returns>string?</returns>
    public static string? CompanyEmployees(this NpgsqlConnection connection, Guid? id,
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
    /// Asynchronously executes sql function company.company_employees(uuid)
    /// </summary>
    /// <param name="id">_id uuid</param>
    /// <returns>Task whose Result property is string?</returns>
    public static async Task<string?> CompanyEmployeesAsync(this NpgsqlConnection connection, Guid? id,
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
