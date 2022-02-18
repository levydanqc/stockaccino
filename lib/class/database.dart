import 'dart:convert';

import 'package:http/http.dart';
import 'user.dart';

class MongoDatabase {
  
  void getUser() {
    var response = await http.get(Uri.parse('http://192.168.50.100:3000/'));

  }
}
