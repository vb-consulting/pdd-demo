#pragma warning disable CS8632
// pgroutiner auto-generated code
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Norm;
using NpgsqlTypes;
using Npgsql;
using System.Runtime.CompilerServices;

namespace PDD.Database.Extensions.Companies;

public static class PgRoutineCompanyDetails
{
    public const string Name = "companies.company_details";

    /// <summary>
    /// Executes sql function companies.company_details(uuid)
    /// </summary>
    /// <param name="id">_id uuid</param>
    /// <returns>string?</returns>
    public static string? CompanyDetails(this NpgsqlConnection connection, Guid? id, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (id, NpgsqlDbType.Uuid))
            .Read<string?>($"select {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefault();
    }

    /// <summary>
    /// Asynchronously executes sql function companies.company_details(uuid)
    /// </summary>
    /// <param name="id">_id uuid</param>
    /// <returns>ValueTask whose Result property is string?</returns>
    public static async ValueTask<string?> CompanyDetailsAsync(this NpgsqlConnection connection, Guid? id, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return await connection
            .WithUnknownResultType()
            .WithCommandBehavior(System.Data.CommandBehavior.SingleResult)
            .WithParameters(
                (id, NpgsqlDbType.Uuid))
            .ReadAsync<string?>($"select {Name}($1)", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber)
            .SingleOrDefaultAsync();
    }
}
