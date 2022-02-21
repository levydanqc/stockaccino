#!/usr/bin/env nodejs

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fs = require('fs');
const obj = JSON.parse(fs.readFileSync('.env', 'utf8'));

const url = obj.mongoUrl;
const port = 3000;
const key = obj.apiKey;
const yahooKey = obj.yahooKey;

async function main() {
    app.listen(port, function () {
        console.log('listening on ' + port);
    });

    app.use(function (req, res, next) {
        if (req.header('x-api-key') == key) {
            next();
        }
        else {
            res.status(401).send({ "message": "Forbidden", "error": "Token d'identification non-valide ou inexistant." });
        }
    });

    const client = new MongoClient(url, {
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected to DB.");
        const db = client.db('stockaccino');
        const users = db.collection('Users');


        app.get('/users', (req, res) => {
            users.find().toArray().then(result => {
                res.json(result);
            })
                .catch(error => {
                    console.error(error);
                    res.status(400).send("Error fetching!");
                });
        });

        app.get('/users', (req, res) => {
            res.send('{"user":"Dan","test":"true"}');
        });

        app.post('/users	', async (req, res) => {
            console.log(req.body);
        });


    } catch (e) {
        console.error(e);
    } //finally {
    //await client.close();
    //}
}

main().catch(console.error);