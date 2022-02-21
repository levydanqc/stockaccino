import 'dart:convert';

import 'package:http/http.dart' as http;

Future<Map> fetchData(
    {required String url,
    required String apiKey,
    Map? queryParams,
    String? symbol}) async {
  if (symbol != null) {
    url += '/$symbol';
  }

  if (queryParams != null) {
    url += '?';
    queryParams.forEach((key, value) {
      url += '$key=$value&';
    });
  }
  var response = await http.get(
    Uri.parse(url),
    headers: {
      "x-api-key": apiKey,
      "Content-type": "application/json",
    },
  );
  return json.decode(response.body);
}
