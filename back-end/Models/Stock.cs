namespace Stockaccino.Models;

public class Stock
{
    double high;
    double low;
    double close;
    double open;
    double volume;

    public Stock(double high, double low, double close, double open, double volume)
    {
        this.high = high;
        this.low = low;
        this.close = close;
        this.open = open;
        this.volume = volume;
    }
}