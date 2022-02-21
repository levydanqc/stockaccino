import 'dart:convert';

import 'package:crypto/crypto.dart';

Duration get loginTime => const Duration(milliseconds: 200);

String hashPwd(String pwd) {
  List<int> bytes = utf8.encode(pwd);
  Digest digest = sha256.convert(bytes);
  return digest.toString();
}

// Future<String?>? signup(String signupData) {
//   return Future.delayed(loginTime).then((_) async {
//     File.read(signupData.name!).then((value) {
//       if (value != null) {
//         return "Un compte est déjà relié à cet email.";
//       }
//     });

//     String pwd = hashPwd(signupData.password!);
//     File.write(signupData.name!, pwd);

//     SharedPreferences prefs = await SharedPreferences.getInstance();
//     prefs.setBool("isLogged", true);

//     return null;
//   });
// }

// Future<String?>? login(LoginData loginData) {
//   return File.read(loginData.name).then((value) async {
//     if (value == null) {
//       return "Aucun compte n'est relié à cet email.";
//     }
//     String pwd = hashPwd(loginData.password);
//     if (value != pwd) {
//       return "L'adresse mail et le mot de passe ne correspondent pas.";
//     }

//     SharedPreferences prefs = await SharedPreferences.getInstance();
//     prefs.setBool("isLogged", true);

//     return null;
//   });
// }

String? validateUser(String? email) {
  if (email == "") {
    return "L'adresse email ne peut être vide.";
  }
  if (!RegExp(r"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$")
      .hasMatch(email!)) {
    return "L'adresse email n'est pas valide.";
  }

  return null;
}

String? validatePwd(String? pwd) {
  if (pwd == "") {
    return "Le mot de passe ne peut être vide.";
  }
  if (pwd!.length < 4) {
    return "Le mot de passe doit contenir au\nminimum 4 caractères.";
  }
  if (!RegExp(r"(?=.*?[A-Z])").hasMatch(pwd)) {
    return "Le mot de passe doit contenir :\n-Une majuscule";
  }
  if (!RegExp(r"(?=.*?[a-z])").hasMatch(pwd)) {
    return "Le mot de passe doit contenir :\n-Une minuscule";
  }
  if (!RegExp(r"(?=.*?[0-9])").hasMatch(pwd)) {
    return "Le mot de passe doit contenir :\n-Un chiffre";
  }

  return null;
}

void recoverPassword(String name) {
  // return File.read(name).then((value) {
  //   if (value == null) {
  //     return "Aucun compte n'est relié à cet email.";
  //   }
  //   return null;
  // });
}
