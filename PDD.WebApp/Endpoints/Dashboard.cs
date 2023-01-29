using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDD.Database.Extensions.Dashboard;
using System.Net.Mime;

namespace PDD.WebApp.Endpoints;

public class Dashboard
{
    public const string ChartCompaniesByCountryUrl = $"{Consts.ApiSegment}/dashboard/companies-by-country";
    public const string ChartEmployeeCountsByAreaUrl = $"{Consts.ApiSegment}/dashboard/employee-counts-by-area";
    public const string ChartEmployeeCountsByYearUrl = $"{Consts.ApiSegment}/dashboard/employee-counts-by-year";
    public const string TopRatedCompaniesUrl = $"{Consts.ApiSegment}/dashboard/top-rated-companies";
    public const string TopExperincedPeopleUrl = $"{Consts.ApiSegment}/top-experinced-people";

    public static void UseEndpoints(WebApplication app)
    {
        app.MapGet(ChartCompaniesByCountryUrl, GetChartCompaniesByCountry).AllowAnonymous();
        app.MapGet(ChartEmployeeCountsByAreaUrl, GetChartEmployeeCountsByArea).AllowAnonymous();
        app.MapGet(ChartEmployeeCountsByYearUrl, GetChartEmployeeCountsByYear).AllowAnonymous();
        app.MapGet(TopRatedCompaniesUrl, GetTopRatedCompanies).AllowAnonymous();
        app.MapGet(TopExperincedPeopleUrl, GetTopExperincedPeople).AllowAnonymous();
    }

    static async Task<string?> GetChartCompaniesByCountry(
        NpgsqlConnection connection,
        HttpResponse response)
    {
        response.ContentType = MediaTypeNames.Application.Json;
        return await connection.ChartCompaniesByCountryAsync(10);
    }

    static async Task<string?> GetChartEmployeeCountsByArea(
        NpgsqlConnection connection,
        HttpResponse response)
    {
        response.ContentType = MediaTypeNames.Application.Json;
        return await connection.ChartEmployeeCountsByAreaAsync(3);
    }

    static async Task<string?> GetChartEmployeeCountsByYear(
        NpgsqlConnection connection,
        HttpResponse response)
    {
        response.ContentType = MediaTypeNames.Application.Json;
        return await connection.ChartEmployeeCountsByYearAsync(5);
    }

    static async Task<string?> GetTopRatedCompanies(
        NpgsqlConnection connection,
        HttpResponse response)
    {
        response.ContentType = MediaTypeNames.Application.Json;
        return await connection.TopRatedCompaniesAsync(5);
    }

    static IAsyncEnumerable<TopExperincedPeopleResult> GetTopExperincedPeople(NpgsqlConnection connection)
    {
        return connection.TopExperincedPeopleAsync(5);
    }
}
