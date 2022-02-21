const { connectDb, getColl } = require('./mongo');

var dB;
connectDb(() => ( db = getColl("Users") ));


function getUsers(req, res) {
    db.find().toArray().then(result => {
        res.json(result);
    })
        .catch(error => {
            console.error(error);
            res.status(400).send("Error fetching!");
        });
}


module.exports = getUsers;
