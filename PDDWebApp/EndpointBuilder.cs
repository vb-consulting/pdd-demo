using System.Net.Mime;
using Microsoft.AspNetCore.Authorization;
using PDD.Database.Extensions;

namespace PDDWebApp;

public static class EndpointBuilder
{
    public static void UseEndpoints(this WebApplication app)
    {
        app.MapGet("api/chart/{typeId}", 
            [AllowAnonymous] (short typeId, NpgsqlConnection connection, HttpResponse response) =>
            {
                response.ContentType = MediaTypeNames.Application.Json;
                return connection.GetChartData(typeId);
            });
    }
}