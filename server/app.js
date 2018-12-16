var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var passport = require("passport");


var app = express();
const port = process.env.PORT || 3000;


// Cross Resource sharing enabled
app.use(cors());
app.use(cors({
    options: '*',
    'Access-Control-Allow-Origin': '*'
    }));
app.options('*', cors());


// Body parsing for data
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// Logger for dev purposes ( set this to prod when using production env)
app.use(logger('dev'));


// Use Passport 
app.use(passport.initialize());

var dbConfig = require('./config/dbConfig');

mongoose.connect(dbConfig.url, { useNewUrlParser: true, useCreateIndex: true,});

mongoose.connection.on('error', (err) => {
    console.log(err);
    process.exit();
});

mongoose.connection.on('open', () => {
    console.log('DB connection establised');
});



require('./config/passport')(passport);


require('./routes/routes')(app, passport);

app.listen(port, () => {
    console.log(' WE are LIVE on ' + port);
});