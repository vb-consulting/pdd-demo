namespace PDD.WebApp.Endpoints;

public static class Extensions
{
    public static void AddCacheHeader(this IHeaderDictionary headers)
    {
        headers.CacheControl = new[] { "public", "max-age=31536000" };
    }
}
