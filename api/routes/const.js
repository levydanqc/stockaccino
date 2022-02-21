const fs = require('fs');
const obj = JSON.parse(fs.readFileSync(process.cwd() + "/" + ".env.json").toString());
const mongoUrl = obj.mongoUrl;
const token = obj.apiKey;
const yahooKey = obj.yahooKey;

module.exports = {
    mongoUrl,
    token,
    yahooKey
}