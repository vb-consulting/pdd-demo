using PDD.WebApp;

if (PDD.WebApp.Scripts.UrlBuilder.Build(args))
{
    return;
}

var builder = WebApplication.CreateBuilder(args);

//
// Add services to the container.
//
{
    builder.Services.AddRazorPages();
    builder.Services.AddHttpClient().AddOptions();
    builder.ConfigureApp();
}

var app = builder.Build();

//
// Configure the HTTP request pipeline.
//
{
    if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler(Urls.ErrorUrl);
        app.UseHsts();
    }

    app.UseApp();
    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseRouting();
    app.UseAuthorization();
    app.MapRazorPages();

    app.Run();
}