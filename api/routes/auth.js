const tx2 = require('tx2');
const env = require('./const');

var validRequests = tx2.counter({
    name: 'Valid Requests',
});
var invalidRequests = tx2.counter({
    name: 'Invalid Requests',
});

module.exports = function (app) {
    app.use(function (req, res, next) {
        if (req.header('x-api-key') == env.token) {
            validRequests.inc();
            next();
        }
        else {
            invalidRequests.inc();
            res.status(401).send({ "message": "Forbidden", "error": "Token d'identification non-valide ou inexistant." });
        }
    });
}
