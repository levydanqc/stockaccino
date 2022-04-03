using System.Runtime.Serialization;

namespace Stockaccino.Models;

public class Stock
{
    public double High { get; set; }

    public double Low { get; set; }

    public double Close { get; set; }

    public double Open { get; set; }

    public double Volume { get; set; }

    public DateTime Date { get; set; }

    public Stock(double high, double low, double close, double open, double volume, DateTime datetime)
    {
        this.High = high;
        this.Low = low;
        this.Close = close;
        this.Open = open;
        this.Volume = volume;
        this.Date = datetime;
    }
}