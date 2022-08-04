namespace PDD.WebApp.Auth.Pages;

public class SigninGitHub : ExternalLoginPartial
{
    public SigninGitHub(IOptionsMonitor<GitHubConfig> config) : base(config.CurrentValue, ExternalType.GitHub) { }
}

