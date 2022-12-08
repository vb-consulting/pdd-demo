#pragma warning disable CS8632
// pgroutiner auto-generated code
using System.Threading.Tasks;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Companies;

public class BusinessAreasResult
{
    public short? Value { get; set; }
    public string? Name { get; set; }
}

public static class PgRoutineBusinessAreas
{
    public const string Name = "companies.business_areas";
    public const string Query = $"select value, name from {Name}()";

    /// <summary>
    /// Executes sql function companies.business_areas()
    /// select value and name from business_areas
    /// </summary>
    /// <returns>IEnumerable of BusinessAreasResult instances</returns>
    public static IEnumerable<BusinessAreasResult> BusinessAreas(this NpgsqlConnection connection,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            UnknownResultTypeList = new bool[] { false, true }
        };
        DatabaseShared.CommandCallback.Run(command, memberName, sourceFilePath, sourceLineNumber);
        if (connection.State != System.Data.ConnectionState.Open)
        {
            connection.Open();
        }
        using var reader = command.ExecuteReader(System.Data.CommandBehavior.Default);
        while (reader.Read())
        {
            object[] values = new object[2];
            reader.GetProviderSpecificValues(values);
            yield return new BusinessAreasResult
            {
                Value = values[0] == DBNull.Value ? null : (short)values[0],
                Name = values[1] == DBNull.Value ? null : (string)values[1]
            };
        }
    }

    /// <summary>
    /// Asynchronously executes sql function companies.business_areas()
    /// select value and name from business_areas
    /// </summary>
    /// <returns>IAsyncEnumerable of BusinessAreasResult instances</returns>
    public static async IAsyncEnumerable<BusinessAreasResult> BusinessAreasAsync(this NpgsqlConnection connection,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        using var command = new NpgsqlCommand(Query, connection)
        {
            CommandType = System.Data.CommandType.Text,
            UnknownResultTypeList = new bool[] { false, true }
        };
        DatabaseShared.CommandCallback.Run(command, memberName, sourceFilePath, sourceLineNumber);
        if (connection.State != System.Data.ConnectionState.Open)
        {
            await connection.OpenAsync();
        }
        using var reader = await command.ExecuteReaderAsync(System.Data.CommandBehavior.Default);
        while (await reader.ReadAsync())
        {
            object[] values = new object[2];
            reader.GetProviderSpecificValues(values);
            yield return new BusinessAreasResult
            {
                Value = values[0] == DBNull.Value ? null : (short)values[0],
                Name = values[1] == DBNull.Value ? null : (string)values[1]
            };
        }
    }
}
