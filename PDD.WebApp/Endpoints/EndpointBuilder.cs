using Newtonsoft.Json.Linq;

namespace PDD.WebApp.Endpoints;

public partial class Urls
{    
    public static JObject JObject { get; private set; }

    static Urls()
    {
        JObject = JObject.FromObject(new Urls());
    }
}

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

    public static void AddCacheHeader(this IHeaderDictionary headers)
    {
        headers.CacheControl = new[] { "public", "max-age=31536000" };
    }
}