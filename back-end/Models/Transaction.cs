using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Stockaccino.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("timestamp")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
    public DateTime Timestamp { get; set; }

    [BsonElement("quantite")]
    public double Quantite { get; set; }

    [BsonElement("ask")]
    public double Ask { get; set; }

    [BsonElement("bid")]
    public double Bid { get; set; }

    [BsonElement("symbol")]
    public string Symbol { get; set; } = null!;

    public Boolean IsBuying { get; set; }
}