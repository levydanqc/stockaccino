const { MongoClient, ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main();

async function main() {
    app.listen(port, function () {
        console.log('listening on ' + port);
    })

    const client = new MongoClient("mongodb://127.0.0.1:27017/");
    await client.connect();


    const database = client.db("stockaccino");

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.get('/dbs', async (req, res) => {
        listDatabases(client);
        res.send('Done');
    });

    app.get('/users', async (req, res) => {
        const users = await database.collection('users').find().toArray(
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.json(result);
                }
            }
        );
        console.log(users);
    });
}


// main()
