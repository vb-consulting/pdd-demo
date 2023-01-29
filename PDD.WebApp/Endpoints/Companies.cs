using Microsoft.AspNetCore.Mvc;
using PDD.Database.Extensions.Companies;
using System.Net.Mime;

namespace PDD.WebApp.Endpoints;

public class Companies
{
    public const string CompaniesSearchUrl = $"{Consts.ApiSegment}/companies/search";
    public const string CompaniesCountriesSearchUrl = $"{Consts.ApiSegment}/companies/countries-search";
    public const string BusinessAreasUrl = $"{Consts.ApiSegment}/companies/business-areas";

    public static void UseEndpoints(WebApplication app)
    {
        app.MapGet(CompaniesSearchUrl, GetCompaniesSearch).AllowAnonymous();
        app.MapGet(CompaniesCountriesSearchUrl, GetCompaniesCountriesSearch).AllowAnonymous();
        app.MapGet(BusinessAreasUrl, GetBusinessAreas).AllowAnonymous();
    }

    static async Task<string?> GetCompaniesSearch(
        [FromQuery] string? search,
        [FromQuery] short[] countries,
        [FromQuery] short[] areas,
        [FromQuery] bool sortAsc,
        [FromQuery] int? skip,
        [FromQuery] int? take,
        NpgsqlConnection connection,
        HttpResponse response)
    {
        response.ContentType = MediaTypeNames.Application.Json;
        return await connection.SearchCompaniesAsync(search, countries, areas, sortAsc, skip, take);
    }

    static async Task<string?> GetCompaniesCountriesSearch(
        [FromQuery] string? search,
        [FromQuery] int? skip,
        [FromQuery] int? take,
        NpgsqlConnection connection,
        HttpResponse response)
    {
        response.ContentType = MediaTypeNames.Application.Json;
        response.Headers.AddCacheHeader();
        return await connection.SearchCountriesAsync(search, skip, take);
    }

    static IAsyncEnumerable<BusinessAreasResult> GetBusinessAreas(
        NpgsqlConnection connection,
        HttpResponse response)
    {
        response.ContentType = MediaTypeNames.Application.Json;
        response.Headers.AddCacheHeader();
        return connection.BusinessAreasAsync();
    }
}

