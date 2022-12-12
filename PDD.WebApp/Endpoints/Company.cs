using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDD.Database.Extensions.Company;
using System.Net.Mime;

namespace PDD.WebApp.Endpoints;

public partial class Urls
{
    public const string CompanyDetailsUrl = $"{Consts.ApiSegment}/company/details";
    public const string CompanyEmployeesUrl = $"{Consts.ApiSegment}/company/employees";
    public const string CompanyReviewsUrl = $"{Consts.ApiSegment}/company/reviews";
}

public partial class Endpoints
{
    public static void UseCompany(WebApplication app)
    {
        app.MapGet(Urls.CompanyDetailsUrl, [AllowAnonymous] async (
            [FromQuery] Guid id,
            NpgsqlConnection connection, 
            HttpResponse response) =>
        {
            var result = await connection.CompanyDetailsAsync(id);
            if (result == null)
            {
                response.StatusCode = 404;
                return $"Company id {id} not found!";
            }
            response.ContentType = MediaTypeNames.Application.Json;
            return result;
        });

        app.MapGet(Urls.CompanyEmployeesUrl, [AllowAnonymous] async (
            [FromQuery] Guid id,
            NpgsqlConnection connection,
            HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.CompanyEmployeesAsync(id);
        });

        app.MapGet(Urls.CompanyReviewsUrl, [AllowAnonymous] async (
            [FromQuery] Guid id,
            [FromQuery] int? skip,
            [FromQuery] int? take,
            NpgsqlConnection connection,
            HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.CompanyReviewsAsync(id, skip, take);
        });
    }
}
