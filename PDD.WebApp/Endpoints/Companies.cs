using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDD.Database.Extensions.Companies;
using System.Net.Mime;

namespace PDD.WebApp.Endpoints
{
    public partial class Endpoints
    {
        public static void UseCompanies(WebApplication app)
        {
            app.MapGet(Urls.CompaniesSearchUrl, [AllowAnonymous] async (
                [FromQuery] string? search,
                [FromQuery] int? skip,
                [FromQuery] int? take,
                NpgsqlConnection connection,
                HttpResponse response) =>
            {
                response.ContentType = MediaTypeNames.Application.Json;
                return await connection.SearchCompaniesAsync(search, skip, take);
            });
        }
    }
}
