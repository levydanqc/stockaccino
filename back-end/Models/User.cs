using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Stockaccino.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    [BsonElement("email")]
    public string Email { get; set; } = null!;

    [BsonElement("prenom")]
    public string Prenom { get; set; } = null!;

    [BsonElement("nom")]
    public string Nom { get; set; } = null!;

    [BsonElement("password")]
    public string Password { get; set; } = null!;

    [BsonElement("username")]
    public string Username { get; set; } = null!;
}