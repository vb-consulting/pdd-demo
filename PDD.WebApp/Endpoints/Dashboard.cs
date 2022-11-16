using Microsoft.AspNetCore.Authorization;
using System.Net.Mime;

namespace PDD.WebApp.Endpoints;

public partial class Endpoints
{
    public static void UseDashboard(WebApplication app)
    {
        app.MapGet(Urls.ChartCompaniesByCountryUrl, [AllowAnonymous] async (
            NpgsqlConnection connection,
            HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.ChartCompaniesByCountryAsync(10);
        });

        app.MapGet(Urls.ChartEmployeeCountsByAreaUrl, [AllowAnonymous] async (
            NpgsqlConnection connection,
            HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.ChartEmployeeCountsByAreaAsync(3);
        });

        app.MapGet(Urls.ChartEmployeeCountsByYearUrl, [AllowAnonymous] async (
            NpgsqlConnection connection,
            HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.ChartEmployeeCountsByYearAsync(5);
        });

        app.MapGet(Urls.TopRatedCompaniesUrl, [AllowAnonymous] async (
            NpgsqlConnection connection,
            HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.TopRatedCompaniesAsync(5);
        });

        app.MapGet(Urls.TopExperincedPeopleUrl, [AllowAnonymous] (
            NpgsqlConnection connection) =>
        {
            return connection.TopExperincedPeopleAsync(5);
        });
    }
}
