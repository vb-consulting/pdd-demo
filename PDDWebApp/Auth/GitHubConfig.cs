﻿namespace PDDWebApp.Auth;

public class GitHubConfig : ExternalLoginConfig
{
    public GitHubConfig()
    {
        RedirectPath = Urls.SignInGitHubUrl;
        LoginUrl = AuthBuilder.LoginGitHubUrl;
    }
}
