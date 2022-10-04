using Newtonsoft.Json;

namespace PDD.WebApp;

public partial class Urls
{
    [JsonProperty] public const string IndexUrl = "/";
    [JsonProperty] public const string CompaniesUrl = "/companies";
    [JsonProperty] public const string ErrorUrl = "/error";
    [JsonProperty] public const string LogoutUrl = "/logout";
    public const string NotFoundUrl = "/404";
    public const string UnathorizedUrl = "/401";
    [JsonProperty] public const string SignInGoogleUrl = "/signin-google";
    [JsonProperty] public const string SignInLinkedInUrl = "/signin-linkedin";
    [JsonProperty] public const string SignInGitHubUrl = "/signin-github";

    public static string Json { get; private set; }

    static Urls()
    {
        Json = JsonConvert.SerializeObject(new Urls());
    }
}
