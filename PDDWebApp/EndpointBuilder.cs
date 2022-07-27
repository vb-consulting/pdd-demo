using System.Net.Mime;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using PDD.Database.Extensions;

namespace PDDWebApp;

public partial class Urls
{
    [JsonProperty] public const string Chart1Url = "api/chart/1";
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
    }
}