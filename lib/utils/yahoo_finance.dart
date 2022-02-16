import 'dart:convert';
import 'const.dart' as api;
import 'package:http/http.dart' as http;

class Yahoo {
  static dynamic getData(
      {required String url,
      required String apiKey,
      List<String>? params}) async {
    final response = await http.get(
      Uri.parse(url),
      headers: {
        "x-api-key": apiKey,
        "Content-type": "application/json",
      },
    );
    String parsedata = response.body;
    var data = jsonDecode(parsedata);
    if (data['message'] == 'Forbidden') {
      throw Exception('Forbidden');
    }
    return data;
  }

  static dynamic getTrending({required String apiKey}) {
    return getData(url: api.ROUTES['trending'], apiKey: apiKey);
  }

  static dynamic getDetails(
      {required List<dynamic> stocks, required String apiKey}) async {
    Map queryParameters = {
      "symbols": stocks.join(','),
      "region": "CA",
      "lang": "en",
    };
    return getData(
        url: api.ROUTES['details'] +
            '?' +
            Uri.parse(queryParameters.entries
                .map((e) => e.key + '=' + e.value.toString())
                .join('&')),
        apiKey: apiKey);
  }

  static dynamic getRecommendations(
      {required String apiKey, required String symbol}) async {
    return getData(
        url: api.ROUTES['recommendations'] + '/' + symbol, apiKey: apiKey);
  }

  static dynamic getAutocomplete(
      {required String apiKey, required String query}) async {
    Map queryParameters = {
      "query": query,
      "region": "CA",
      "lang": "en",
    };
    return getData(
        url: api.ROUTES['autocomplete'] +
            '?' +
            Uri.parse(queryParameters.entries
                .map((e) => e.key + '=' + e.value.toString())
                .join('&')),
        apiKey: apiKey);
  }
}
