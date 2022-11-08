using System.Net.Mime;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDD.Database.Extensions;

namespace PDD.WebApp.Endpoints;

public class Cache { public string? Version { get; set; } }

public static class EndpointBuilder
{
    public static void ConfigureEndpoints(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<Cache>(builder.Configuration.GetSection(nameof(Cache)));

        foreach (var method in typeof(Endpoints).GetMethods(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static))
        {
            var p = method.GetParameters();
            if (p.Length == 1 && p[0].ParameterType == typeof(WebApplicationBuilder))
            {
                method.Invoke(null, new[] { builder });
            }
        }
    }

    public static void UseEndpoints(this WebApplication app)
    {
        foreach(var method in typeof(Endpoints).GetMethods(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static))
        {
            var p = method.GetParameters();
            if (p.Length == 1 && p[0].ParameterType == typeof(WebApplication))
            {
                method.Invoke(null, new[] { app });
            }
        }
    }
}