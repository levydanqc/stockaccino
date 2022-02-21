const { connectDb, getDb } = require('./mongo');

var dB;
connectDb(() => ( db = getDb("Users") ));


function getUsers(req, res) {
    db.find().toArray().then(result => {
        res.json(result);
    })
        .catch(error => {
            console.error(error);
            res.status(400).send("Error fetching!");
        });
}