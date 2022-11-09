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
using PDD.Database.Models;

namespace PDD.Database.Extensions.Companies;

public static class PgRoutineBusinessAreas
{
    public const string Name = "companies.business_areas";

    /// <summary>
    /// Executes sql function companies.business_areas()
    /// select value and name from business_areas
    /// </summary>
    /// <returns>IEnumerable of BusinessAreasResult instances</returns>
    public static IEnumerable<BusinessAreasResult> BusinessAreas(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .Read<BusinessAreasResult>($"select value, name from {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber);
    }

    /// <summary>
    /// Asynchronously executes sql function companies.business_areas()
    /// select value and name from business_areas
    /// </summary>
    /// <returns>IAsyncEnumerable of BusinessAreasResult instances</returns>
    public static IAsyncEnumerable<BusinessAreasResult> BusinessAreasAsync(this NpgsqlConnection connection, [CallerMemberName] string memberName = "", [CallerFilePath] string sourceFilePath = "", [CallerLineNumber] int sourceLineNumber = 0)
    {
        return connection
            .ReadAsync<BusinessAreasResult>($"select value, name from {Name}()", memberName: memberName, sourceFilePath: sourceFilePath, sourceLineNumber: sourceLineNumber);
    }
}
