
var express = require('express');
var app = express();
var database = require('../config/database');
var moment = require('moment');

// For getting all the tweets from a specific user
app.get('/tweets/user/:id', (req, res) => {
    let sql = `SELECT * FROM tweet WHERE user_id = ${req.params.id}`;

    database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                message: err
            });
            return;
        }

        if (result.length) res.json(result);
        else res.json({});        
    });
});

// For adding our tweets
app.post('/tweets', (req, res) => {
    let sql = `INSERT INTO tweet (user_id, content, date_time) VALUES (
        '${req.body.user_id}',
        '${req.body.content}',
        '${moment().utc().format("YYYY-MM-DD hh:mm:ss")}'
    )`;

    database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                message: err
            });
            return;
        }

        // If there is no error
        res.status(200).json({
            status: 200,
            success: true
        });
         
    });
});

app.delete('/tweets/:id', (req, res) => {
    let sql = `DELETE FROM tweet WHERE id = ${req.params.id}`;

    database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false
            });
        } else {
            res.status(200).json({
                status: 200,
                success: true
            });
        }
    });
})

module.exports = app;