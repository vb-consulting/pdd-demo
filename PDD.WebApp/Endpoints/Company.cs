using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDD.Database.Extensions.Company;
using System.Net.Mime;

namespace PDD.WebApp.Endpoints;

public partial class Endpoints
{
    public static void UseCompany(WebApplication app)
    {
        app.MapGet(Urls.CompanyDetailsUrl, [AllowAnonymous] async (
            [FromQuery] Guid id,
            NpgsqlConnection connection, 
            HttpResponse response) =>
        {
            var result = await connection.CompanyDetailsAsync(id);
            if (result == null)
            {
                response.StatusCode = 404;
                return $"Company id {id} not found!";
            }
            response.ContentType = MediaTypeNames.Application.Json;
            return result;
        });

        app.MapGet(Urls.CompanyEmployeesUrl, [AllowAnonymous] async (
            [FromQuery] Guid id,
            NpgsqlConnection connection,
            HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.CompanyEmployeesAsync(id);
        });
    }
}
