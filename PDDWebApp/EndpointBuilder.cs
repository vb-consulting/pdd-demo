using System.Net.Mime;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace PDDWebApp;

public partial class Urls
{
    [JsonProperty] public const string Chart1Url = "api/chart/1";
    [JsonProperty] public const string Chart2Url = "api/chart/2";
    [JsonProperty] public const string Chart3Url = "api/chart/3";
    [JsonProperty] public const string Chart4Url = "api/chart/4";
    [JsonProperty] public const string Chart5Url = "api/chart/5";
    [JsonProperty] public const string Chart6Url = "api/chart/6";
}

public static class EndpointBuilder
{
    public static void UseEndpoints(this WebApplication app)
    {
        app.MapGet(Urls.Chart1Url, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.Chart1Async();
        });

        app.MapGet(Urls.Chart2Url, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.Chart2Async();
        });

        app.MapGet(Urls.Chart3Url, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.Chart3Async();
        });

        app.MapGet(Urls.Chart4Url, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.Chart4Async();
        });

        app.MapGet(Urls.Chart5Url, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.Chart5Async();
        });

        app.MapGet(Urls.Chart6Url, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.Chart6Async();
        });
    }
}