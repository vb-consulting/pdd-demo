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
                [FromQuery] short[] countries,
                [FromQuery] short[] areas,
                [FromQuery] int? skip,
                [FromQuery] int? take,
                NpgsqlConnection connection,
                HttpResponse response) =>
            {
                response.ContentType = MediaTypeNames.Application.Json;
                return await connection.SearchCompaniesAsync(search, countries, areas, skip, take);
            });

            app.MapGet(Urls.CompaniesCountriesSearchUrl, [AllowAnonymous] async (
                [FromQuery] string? search,
                [FromQuery] int? skip,
                [FromQuery] int? take,
                NpgsqlConnection connection,
                HttpResponse response) =>
            {
                response.ContentType = MediaTypeNames.Application.Json;
                response.Headers.AddCacheHeader();
                return await connection.SearchCountriesAsync(search, skip, take);
            });

            app.MapGet(Urls.BusinessAreasUrl, [AllowAnonymous] (NpgsqlConnection connection, HttpResponse response) =>
            {
                response.ContentType = MediaTypeNames.Application.Json;
                response.Headers.AddCacheHeader();
                return connection.BusinessAreasAsync();
            });
        }
    }
}
