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

    public override bool Equals(object? obj)
    {
        if (obj == null)
        {
            return false;
        }
        if (!(obj is Notification))
        {
            return false;
        }
        return (this.Message == ((Notification)obj).Message)
            && (this.Read == ((Notification)obj).Read);
    }

    public override int GetHashCode()
    {
        return Message.GetHashCode() ^ Read.GetHashCode();
    }
}