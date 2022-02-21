const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const trending = require("../routes/yahoo/trending");
const getUsers = require("./mongo/users.js");


module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));

    require("./auth.js")(app);

    app.use("/yahoo/trending", trending);
    app.use("/mongo/users", getUsers);
};
