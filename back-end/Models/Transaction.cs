using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Stockaccino.Models;

public class Transaction
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
    public DateTime Timestamp { get; set; }

    public double Quantite { get; set; }

    public double Ask { get; set; }

    public double Bid { get; set; }

    public string Symbol { get; set; } = null!;

    public Boolean IsBuying { get; set; }
}