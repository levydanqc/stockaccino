namespace Stockaccino.Models;

public class Screener
{
    public string Title { get; set; }

    public string Description { get; set; }

    public List<Suggestion> Suggestions { get; set; }

    public Screener(string title, string description)
    {
        this.Title = title;
        this.Description = description;
        this.Suggestions = new List<Suggestion>();
    }
}