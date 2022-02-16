import 'dart:convert';
import 'api_routes.dart' as api;
import 'package:http/http.dart' as http;

class Yahoo {

  static dynamic getTrending(apiKey) async {
    final response = await http.get(
      Uri.parse(api.routes['trending']),
      headers: {
        "x-api-key": apiKey,
        "Content-type": "application/json",
      },
    );
    String parsedata = response.body;
    var data = jsonDecode(parsedata);
    return data;
  }
}
