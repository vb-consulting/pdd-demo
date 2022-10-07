using System.Net.Mime;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDD.Database.Extensions.Companies;

namespace PDD.WebApp.Data;

public static class EndpointBuilder
{
    public static void ConfigureEndpoints(this WebApplicationBuilder builder)
    {
    }

    public static void UseEndpoints(this WebApplication app)
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

        app.MapGet(Urls.TopRatedCompaniesUrl, [AllowAnonymous] (
            NpgsqlConnection connection) =>
        {
            return connection.TopRatedCompaniesAsync(5);
        });
    
        app.MapGet(Urls.TopExperincedPeopleUrl, [AllowAnonymous] (
            NpgsqlConnection connection) =>
        {
            return connection.TopExperincedPeopleAsync(5);
        });

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