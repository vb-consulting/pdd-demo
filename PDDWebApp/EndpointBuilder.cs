using System.Net.Mime;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace PDDWebApp;

public partial class Urls
{
    [JsonProperty] public const string Chart1Url = "api/chart/1";
    [JsonProperty] public const string Chart2Url = "api/chart/2";
}

public static class EndpointBuilder
{
    public static void UseEndpoints(this WebApplication app)
    {
        app.MapGet(Urls.Chart1Url, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.ChartTop10ComapniesByEmployeesAsync();
        });

        app.MapGet(Urls.Chart2Url, [AllowAnonymous] async (NpgsqlConnection connection, HttpResponse response) =>
        {
            response.ContentType = MediaTypeNames.Application.Json;
            return await connection.ChartTop10ComapniesLast10YearsNumberOfEmployeesAsync();
        });
    }
}