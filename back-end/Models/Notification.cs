namespace Stockaccino.Models;

public class Notification
{
    public string Message { get; set; }

    public Boolean Read { get; set; }

    public Notification(string message, Boolean read)
    {
        this.Message = message;
        this.Read = read;
    }
}