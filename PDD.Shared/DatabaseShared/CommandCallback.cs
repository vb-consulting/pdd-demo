using Npgsql;

namespace DatabaseShared;

public class CommandCallback
{
    public static Action<NpgsqlCommand, string, string, int>? Callback { get; set; } = null;

    public static void Run(NpgsqlCommand command, string memberName, string sourceFilePath, int sourceLineNumber)
    {
        if (Callback == null)
        {
            return;
        }
        Callback(command, memberName, sourceFilePath, sourceLineNumber);
    }
}
