using System.Net.Mime;
using Microsoft.AspNetCore.Authorization;

namespace PDD.WebApp.Data;

public static class EndpointBuilder
{
    public static void ConfigureEndpoints(this WebApplicationBuilder builder)
    {
    }

    public static void UseEndpoints(this WebApplication app)
    {
        app.MapGet(Urls.ChartCompaniesByCountryUrl, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.ChartCompaniesByCountryAsync();
        });

        app.MapGet(Urls.ChartEmployeeCountsByAreaUrl, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.ChartEmployeeCountsByAreaAsync();
        });

        app.MapGet(Urls.ChartEmployeeCountsByYearUrl, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.ChartEmployeeCountsByYearAsync();
        });
    }
}