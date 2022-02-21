import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:stockaccino/class/database.dart';
import 'package:stockaccino/class/yahoo_finance.dart';

import '../class/user.dart';

class HomePage extends StatefulWidget {
  static const id = '/';

  const HomePage({Key? key}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late MongoDatabase _db;
  late YahooFinance _yahoo;
  User user = User(
      nom: "Beaulieu",
      prenom: "Yann",
      email: "ybeaulieu@mongo.ca",
      password: "123456");

  @override
  void initState() {
    rootBundle.loadString('.env').then((value) {
      setState(() {
        for (String line in value.split('\n')) {
          if (line.startsWith('YAHOO_KEY')) {
            _yahoo = YahooFinance(apiKey: line.split('=')[1]);
          } else if (line.startsWith('MONGO_KEY')) {
            _db = MongoDatabase(apiKey: line.split('=')[1]);
          }
        }
      });
    });

    super.initState();
  }

  void _incrementCounter() {
    setState(() {
      _yahoo.getTrending().then((value) => print(value));
      // _db.test().then((value) => print(value));
      // _yahoo.getTrending();
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: const Text("Stockaccino"),
      ),
      drawer: Drawer(
        // Add a ListView to the drawer. This ensures the user can scroll
        // through the options in the drawer if there isn't enough vertical
        // space to fit everything.
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: [
            // Container(
            //   margin: const EdgeInsets.only(bottom: 20),
            //   padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            //   decoration: const BoxDecoration(
            //     color: Colors.blue,
            //   ),
            //   child: const Text('Username'),
            //   alignment: Alignment.center,
            // ),
            AppBar(
              title: const Text('Username'),
              automaticallyImplyLeading: false,
              actions: [
                IconButton(
                  icon: const Icon(Icons.settings),
                  onPressed: () {
                    Navigator.pop(context);
                  },
                ),
              ],
            ),
            ListTile(
              title: const Text('Trending'),
              leading: const Icon(Icons.trending_up_rounded),
              iconColor: Colors.black,
              textColor: Colors.black,
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('My Shares'),
              leading: const Icon(Icons.monetization_on_outlined),
              iconColor: Colors.black,
              textColor: Colors.black,
              onTap: () {
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Invoke "debug painting" (press "p" in the console, choose the
          // "Toggle Debug Paint" action from the Flutter Inspector in Android
          // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
          // to see the wireframe for each widget.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'You have pushed the button this many times:',
            ),
            TextButton.icon(
                onPressed: () {},
                style: ButtonStyle(
                  textStyle: MaterialStateProperty.all<TextStyle>(
                    const TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    ),
                  ),
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.red.shade900),
                ),
                icon: const Icon(Icons.local_fire_department_outlined),
                label: const Text("Get Trending")),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
