using Microsoft.AspNetCore.Authorization;
using System.Net.Mime;

namespace PDD.WebApp.Endpoints;

public partial class Urls
{
    public const string ChartCompaniesByCountryUrl = $"{Consts.ApiSegment}/dashboard/companies-by-country";
    public const string ChartEmployeeCountsByAreaUrl = $"{Consts.ApiSegment}/dashboard/employee-counts-by-area";
    public const string ChartEmployeeCountsByYearUrl = $"{Consts.ApiSegment}/dashboard/employee-counts-by-year";
    public const string TopRatedCompaniesUrl = $"{Consts.ApiSegment}/dashboard/top-rated-companies";
    public const string TopExperincedPeopleUrl = $"{Consts.ApiSegment}/top-experinced-people";
}

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
