const dbUsers = require('./mongo')

function users(req, res) {
    res.send('{"user":"Dan","test":"true"}');
    dbUsers.find().toArray().then(result => {
        res.json(result);
    })
        .catch(error => {
            console.error(error);
            res.status(400).send("Error fetching!");
        });
}

module.exports = users;