using System.Runtime.Serialization;

namespace Stockaccino.Models;

public class Trending
{
    public string Symbol { get; set; }

    public double Change { get; set; }

    public double ChangePercent { get; set; }

    public Trending(string symbol, double change, double changePercent)
    {
        this.Symbol = symbol;
        this.Change = change;
        this.ChangePercent = changePercent;
    }
}