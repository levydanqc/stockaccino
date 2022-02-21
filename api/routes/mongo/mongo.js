const { MongoClient } = require("mongodb");
const env = require('../const')

const client = new MongoClient(env.mongoUrl, {
    useUnifiedTopology: true,
});

async function connectDB() {
    await client.connect();
    const db = client.db('stockaccino');
    return db.collection('Users');
}

const users = connectDB();

module.exports = users;