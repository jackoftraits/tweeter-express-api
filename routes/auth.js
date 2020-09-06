var express = require('express');
var app = express();
var database = require('../config/database');
var authValidations = require('../validations/auth');

// Handles authentication for the users
app.post('/authenticate', (req, res) => {

    // Get the decrypted email and password from headers
    let requestBody = getCredentialsFromHeaders(req);

    // Validation our authentications using Joi npm library
    const { error } = authValidations(requestBody)

    if (error) {
        res.json({
            id : "",
            message: error.details[0].message
        })
    } else {
        let sql = `SELECT id FROM users WHERE email = '${requestBody.email}' AND password = '${requestBody.password}'`;

        database.query(sql, (err, result) => {
            if (err) {
                res.status(400).send(err);
                return;
            }

            if (result.length) res.json(result[0]);
            else res.json({
                id : "",
                message : "Wrong username or password!"
            });

        });
    }

});

// Get the user's credential from the headers
function getCredentialsFromHeaders(req) {

    // Get the authorization from headers
    let authorization = req.header('authorization');

    // Convert authorization to array
    let authData = authorization.split(" ");

    // Convert to utf-8
    let token = Buffer.from(`${authData[1]}`, 'base64').toString('utf8');

    // Convert token to array
    let credentials = token.split(":");

    return {
        email: credentials[0],
        password : credentials[1]
    }
}

module.exports = app;