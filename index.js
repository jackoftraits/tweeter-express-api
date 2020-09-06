var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./config/database');
var port = process.env.PORT || 3005;

// Connect to our database
database.connect((err) => {
    if (err) throw err;
});

// This is to allow our api for cross-origin resource sharing
app.use(cors());

// This is to allow our api for parsing json
app.use(express.json());

// This is to allow our api to receive data from a client app
app.use(express.urlencoded({
    extended: true
}));

// Register routes in the main index.js
app.use('/', [
    require('./routes/tweet'),
    require('./routes/auth')
]);

// http://localhost:3005/tweets - GET, POST
// http://localhost:3005/tweets/user/:id - GET
// http://localhost:3005/tweets/:id - DELETE
// http://localhost:3005/authenticate - POST for login session



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});