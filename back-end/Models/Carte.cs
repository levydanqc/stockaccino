using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Stockaccino.Models;

public class Carte
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Number { get; set; } = null!;

    public string Month { get; set; } = null!;

    public string Year { get; set; } = null!;

    public string CVV { get; set; } = null!;
}