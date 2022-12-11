#pragma warning disable CS8632
// pgroutiner auto-generated code
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Company;

public static class PgRoutineCompanyReviews
{
    public const string Name = "company.company_reviews";
    public const string Query = $"select {Name}($1, $2, $3)";

    /// <summary>
    /// Executes plpgsql function company.company_reviews(uuid, integer, integer)
    /// </summary>
    /// <param name="id">_id uuid</param>
    /// <param name="skip">_skip integer</param>
    /// <param name="take">_take integer</param>
    /// <returns>string?</returns>
    public static string? CompanyReviews(this NpgsqlConnection connection, Guid? id, int? skip, int? take,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Uuid, Value = id == null ? DBNull.Value : id },
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
    /// Asynchronously executes plpgsql function company.company_reviews(uuid, integer, integer)
    /// </summary>
    /// <param name="id">_id uuid</param>
    /// <param name="skip">_skip integer</param>
    /// <param name="take">_take integer</param>
    /// <returns>Task whose Result property is string?</returns>
    public static async Task<string?> CompanyReviewsAsync(this NpgsqlConnection connection, Guid? id, int? skip, int? take,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            Parameters =
            {
                new() { NpgsqlDbType = NpgsqlDbType.Uuid, Value = id == null ? DBNull.Value : id },
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
