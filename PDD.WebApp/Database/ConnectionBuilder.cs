using PDD.Database;
using System.Text;

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
        var connectionString =
            app.Configuration.GetConnectionString(connectionName) ??
            app.Configuration.GetValue<string>($"POSTGRESQLCONNSTR_{connectionName}");

        var builder = new NpgsqlConnectionStringBuilder(connectionString);
        builder.ApplicationName ??= Environment.CurrentDirectory.Split(Path.DirectorySeparatorChar).LastOrDefault() ?? Consts.Title;
        ConnectionBuilder.connectionString = builder.ToString();

        AppContext.SetSwitch("Npgsql.EnableSqlRewriting", false);

        var appendCommandHeaders = app.Configuration.GetValue<bool>("AppendCommandHeaders");
        var logCommands = app.Configuration.GetValue<bool>("LogCommands");
        if (!appendCommandHeaders && !logCommands)
        {
            return;
        }
        DatabaseShared.CommandCallback.Callback = (command, memberName, sourceFilePath, sourceLineNumber) =>
        {
            if (appendCommandHeaders)
            {
                AppendCommandHeaders(command, memberName, sourceFilePath, sourceLineNumber);
            }
            if (logCommands)
            {
                logger.LogInformation(command.CommandText);
            }
        };
    }

    public static void AppendCommandHeaders(NpgsqlCommand command, string memberName, string sourceFilePath, int sourceLineNumber)
    {
        var sb = new StringBuilder();
        sb.Append("at ");
        sb.Append(memberName);
        sb.Append(" in ");
        sb.Append(sourceFilePath);
        sb.Append("#");
        sb.Append(sourceLineNumber);
        sb.Append("\n");

        int paramIndex = 0;
        foreach (NpgsqlParameter p in command.Parameters)
        {
            paramIndex++;
            string paramType = p.DataTypeName?.ToString() ?? "";
            
            object? value = p.Value is DateTime time ? time.ToString("o") : p.Value;
            if (value == DBNull.Value)
            {
                value = "null";
            }
            else if (value is string)
            {
                value = string.Concat("\"", value, "\"").Replace("/*", "??").Replace("*/", "??");
            }
            else if (value is bool)
            {
                value = value?.ToString()?.ToLowerInvariant();
            }
            else if (value is System.Collections.ICollection)
            {
                var array = new List<string?>();
                var enumerator = (value as System.Collections.IEnumerable)?.GetEnumerator();

                if (enumerator != null)
                    while (enumerator.MoveNext())
                    {
                        array.Add(enumerator.Current.ToString());
                    }
                
                value = string.Concat("{", string.Join(", ", array), "}");
            }
            var name = string.IsNullOrEmpty(p.ParameterName) ?
                string.Concat("$", paramIndex.ToString()) :
                string.Concat("@", p.ParameterName);
            
            sb.Append(name);
            sb.Append(" ");
            sb.Append(paramType);
            sb.Append(" = ");
            sb.Append(value);
            sb.Append("\n");
        }

        if (sb.Length > 0)
        {
            command.CommandText = string.Concat(string.Concat("/*\n", sb.ToString(), "*/\n"), command.CommandText);
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