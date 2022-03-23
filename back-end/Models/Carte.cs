using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Stockaccino.Models;

public class Carte
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("number")]
    public string Number { get; set; } = null!;

    [BsonElement("month")]
    public string Month { get; set; } = null!;

    [BsonElement("year")]
    public string Year { get; set; } = null!;

    [BsonElement("cvv")]
    public string CVV { get; set; } = null!;
}