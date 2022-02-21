import '../utils/const.dart';
import '../utils/request.dart';

class YahooFinance {
  final String apiKey;

  YahooFinance({required this.apiKey});

  Future<Map> getTrending() async {
    return await fetchData(
        url: yahooBaseUrl + yahooEndpoint['trending'], apiKey: apiKey);
  }

  dynamic getDetails({required List<dynamic> stocks}) async {
    Map queryParams = {
      "symbols": stocks.join(','),
      "region": "CA",
      "lang": "en",
    };
    return fetchData(
        url: yahooBaseUrl + yahooEndpoint["details"],
        queryParams: queryParams,
        apiKey: apiKey);
  }

  dynamic getRecommendations(
      {required String apiKey, required String symbol}) async {
    return fetchData(
        url: yahooBaseUrl + yahooEndpoint["recommendations"],
        symbol: symbol,
        apiKey: apiKey);
  }

  static dynamic getAutocomplete(
      {required String apiKey, required String query}) async {
    Map queryParams = {
      "query": query,
      "region": "CA",
      "lang": "en",
    };
    return fetchData(
        url: yahooBaseUrl + yahooEndpoint["autocomplete"],
        queryParams: queryParams,
        apiKey: apiKey);
  }
}
