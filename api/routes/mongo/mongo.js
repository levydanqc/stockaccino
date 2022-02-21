const { MongoClient } = require("mongodb");
const env = require('../const')

var db;

const connectDb = (callback) => {
    if (db) return callback();
    MongoClient.connect(env.mongoUrl, { useUnifiedTopology: true },
        (err, database) => {
            if (err) return console.log(err);
            db = database.db("stockaccino");
            callback();
        }
    )
}

const getColl = (collectionToGet) => {
    return db.collection(collectionToGet);
}

module.exports = {
    connectDb,
    getColl,
}
