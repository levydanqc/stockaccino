namespace Stockaccino.Models;

public class Suggestion
{
    public string Name { get; set; }

    public string Symbol { get; set; }

    public double Change { get; set; }

    public double ChangePercent { get; set; }

    public double Ask { get; set; }

    public Suggestion(string name, string symbol, double change, double changePercent, double ask)
    {
        this.Name = name;
        this.Symbol = symbol;
        this.Change = change;
        this.ChangePercent = changePercent;
        this.Ask = ask;
    }
}