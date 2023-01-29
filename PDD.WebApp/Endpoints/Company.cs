using Microsoft.AspNetCore.Mvc;
using PDD.Database.Extensions.Company;
using System.Net.Mime;

namespace PDD.WebApp.Endpoints;

public class Company
{
    public const string CompanyDetailsUrl = $"{Consts.ApiSegment}/company/details";
    public const string CompanyEmployeesUrl = $"{Consts.ApiSegment}/company/employees";
    public const string CompanyReviewsUrl = $"{Consts.ApiSegment}/company/reviews";

    public static void UseEndpoints(WebApplication app)
    {
        app.MapGet(CompanyDetailsUrl, GetCompanyDetails).AllowAnonymous();
        app.MapGet(CompanyEmployeesUrl, GetCompanyEmployees).AllowAnonymous();
        app.MapGet(CompanyReviewsUrl, GetCompanyReviews).AllowAnonymous();
    }

    static async Task<string?> GetCompanyDetails(
        [FromQuery] Guid id,
        NpgsqlConnection connection, 
        HttpResponse response)
    {
        var result = await connection.CompanyDetailsAsync(id);
        if (result == null)
        {
            response.StatusCode = 404;
            return $"Company id {id} not found!";
        }
        response.ContentType = MediaTypeNames.Application.Json;
        return result;
    }

    static async Task<string?> GetCompanyEmployees(
        [FromQuery] Guid id,
        NpgsqlConnection connection,
        HttpResponse response)
    {
        response.ContentType = MediaTypeNames.Application.Json;
        return await connection.CompanyEmployeesAsync(id);
    }

    static async Task<string?> GetCompanyReviews(
        [FromQuery] Guid id,
        [FromQuery] int? skip,
        [FromQuery] int? take,
        NpgsqlConnection connection,
        HttpResponse response)
    {
        response.ContentType = MediaTypeNames.Application.Json;
        return await connection.CompanyReviewsAsync(id, skip, take);
    }
}
