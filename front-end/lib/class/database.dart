import 'user.dart';
import '../utils/request.dart';
import '../utils/const.dart';

class MongoDatabase {
  final String apiKey;

  MongoDatabase({required this.apiKey});

  Future<Map> test() async {
    var response = await fetchData(
        url: mongoBaseUrl + mongoEndpoint["test"], apiKey: apiKey);
    return response;
  }

  Future<User> getUser() async {
    var response = await fetchData(
        url: mongoBaseUrl + mongoEndpoint["users"], apiKey: apiKey);
    return User.fromJson(response);
  }
}
