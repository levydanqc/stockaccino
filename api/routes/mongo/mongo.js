// import { mongoUrl } from "../const";
const mongoUrl = require('../const')
const client = new MongoClient(mongoUrl, {
    useUnifiedTopology: true,
});

await client.connect();
const db = client.db('stockaccino');
const users = db.collection('Users');

module.exports = { users };