class User {
  final String nom;
  final String prenom;
  final String email;
  final String password;

  User(
      {required this.nom,
      required this.prenom,
      required this.email,
      required this.password});

  Map<String, dynamic> toJson() {
    return {
      'nom': nom,
      'prenom': prenom,
      'email': email,
      'password': password,
    };
  }

  static User fromJson(Map response) {
    return User(
      nom: response['nom'],
      prenom: response['prenom'],
      email: response['email'],
      password: response['password'],
    );
  }
}
