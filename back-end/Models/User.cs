using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Stockaccino.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Email { get; set; } = null!;

    public string Prenom { get; set; } = null!;

    public string Nom { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string[] Stocks { get; set; } = null!;

    public string[] Amis { get; set; } = null!;

    public string[] Requetes { get; set; } = null!;

    public List<Notification> Notifications { get; set; } = null!;
}