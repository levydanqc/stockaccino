const token = require('./const')

module.exports = function (app) {
    app.use(function (req, res, next) {
        if (req.header('x-api-key') == token) {
            next();
        }
        else {
            res.status(401).send({ "message": "Forbidden", "error": "Token d'identification non-valide ou inexistant." });
        }
    });
}