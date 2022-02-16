class User {
  final String nom;
  final String prenom;
  final String email;
  final String pwd;

  User(
      {required this.nom,
      required this.prenom,
      required this.email,
      required this.pwd});

  Map<String, dynamic> toJson() {
    return {
      'nom': nom,
      'prenom': prenom,
      'email': email,
      'pwd': pwd,
    };
  }
}
