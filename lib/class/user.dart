class User {
  late String nom;
  late String prenom;
  late String email;
  late String pwd;

  User(String pNom, String pPrenom, String pEmail, String pPwd) {
    nom = pNom;
    prenom = pPrenom;
    email = pEmail;
    pwd = pPwd;

    saveToDB();
  }

  void saveToDB() {}
}
