using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDD.Database.Extensions.Companies;
using System.Net.Mime;

namespace PDD.WebApp.Endpoints;

public partial class Urls
{
    public const string CompaniesSearchUrl = $"{Consts.ApiSegment}/companies/search";
    public const string CompaniesCountriesSearchUrl = $"{Consts.ApiSegment}/companies/countries-search";
    public const string BusinessAreasUrl = $"{Consts.ApiSegment}/companies/business-areas";
}

public partial class Endpoints
{
    public static void UseCompanies(WebApplication app)
    {
        app.MapGet(Urls.CompaniesSearchUrl, [AllowAnonymous] async (
            [FromQuery] string? search,
            [FromQuery] short[] countries,
            [FromQuery] short[] areas,
            [FromQuery] bool sortAsc,
            [FromQuery] int? skip,
            [FromQuery] int? take,
            NpgsqlConnection connection,
            HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.SearchCompaniesAsync(search, countries, areas, sortAsc, skip, take);
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

        app.MapGet(Urls.BusinessAreasUrl, [AllowAnonymous] (
            NpgsqlConnection connection, 
            HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            response.Headers.AddCacheHeader();
            return connection.BusinessAreasAsync();
        });
    }
}
