namespace PDD.WebApp.Database;

public static class ConnectionBuilder
{
    public const string NameKey = "ConnectionName";
    public const string LogDatabaseCallsKey = "LogDatabaseCalls";

    private const string info = "INFO";
    private const string notice = "NOTICE";
    private const string log = "LOG";
    private const string warning = "WARNING";
    private const string debug = "DEBUG";
    private const string error = "ERROR";
    private const string panic = "PANIC";

    private static ILogger? logger;
    private static string? connectionString;

    public static void ConfigureDatabase(this WebApplicationBuilder builder)
    {
        builder.Services.AddTransient(_ => Create());
    }

    public static void UseDatabase(this WebApplication app)
    {
        logger = app.Logger;
        var connectionName = GetConnectionName(app.Configuration);
        connectionString =
            app.Configuration.GetConnectionString(connectionName) ??
            app.Configuration.GetValue<string>($"POSTGRESQLCONNSTR_{connectionName}");

        var builder = new NpgsqlConnectionStringBuilder(connectionString);
        builder.ApplicationName ??= Environment.CurrentDirectory.Split(Path.DirectorySeparatorChar).LastOrDefault() ?? Consts.Title;
        
        if (app.Environment.IsDevelopment() || app.Configuration.GetValue<bool?>(LogDatabaseCallsKey) == true)
        {
            NormOptions.Configure(options =>
            {
                options.NpgsqlEnableSqlRewriting = false;
                options.CommandCommentHeader.Enabled = true;
                options.CommandCommentHeader.IncludeCallerInfo = true;
                options.CommandCommentHeader.IncludeCommandAttributes = false;
                options.CommandCommentHeader.IncludeTimestamp = false;
                options.CommandCommentHeader.IncludeParameters = true;
                options.DbCommandCallback = cmd => logger.LogInformation(cmd.CommandText);
            });
        }
        else
        {
            NormOptions.Configure(options =>
            {
                options.NpgsqlEnableSqlRewriting = false;
            });
        }
    }

    private static string GetConnectionName(IConfiguration config)
    {
        var result = config.GetValue<string>(NameKey);
        result ??= config
            .AsEnumerable()
            .Where(c => c.Key.StartsWith("ConnectionStrings:"))
            .Select(c => c.Key.Split(':')[1])
            .First();
        return result;
    }

    private static NpgsqlConnection Create()
    {
        var connection = new NpgsqlConnection(connectionString);
        connection.Notice += (sender, args) =>
        {
            if (logger is null)
            {
                return;
            }
            var severity = args.Notice.Severity;
            var msg = $"{args.Notice.Where}:{Environment.NewLine}{args.Notice.MessageText}{Environment.NewLine}";

            if (severity.StartsWith(info) || severity.StartsWith(notice) || severity.StartsWith(log))
            {
                logger.LogInformation(msg);
            }
            else if (severity.StartsWith(warning))
            {
                logger.LogWarning(msg);
            }
            else if (severity.StartsWith(debug))
            {
                logger.LogDebug(msg);
            }
            else if (severity.StartsWith(error) || severity.StartsWith(panic))
            {
                logger.LogError(msg);
            }
            else
            {
                logger.LogTrace(msg);
            }
        };
        return connection;
    }
}