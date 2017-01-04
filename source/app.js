'use strict';

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');

var conf = require('source/config/app.conf');
var logger = require('source/shared/logger.service');
var activity = require('source/activity');

var dsmApp = express();

mongoose.connect(conf.connectionString);
mongoose.Promise = require('q').Promise;
mongoose.set('debug', true);

logger.turnOnLog(1);

dsmApp.use(session({
    secret: 'brazisthegodoflambada',
    cookie: {
        name: 'dsm.session',
        maxAge: 1000 * 60 * 20
    },
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({mongooseConnection: mongoose.connection})
}));

dsmApp.use(bodyParser.json());
dsmApp.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS
dsmApp.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Register routers
dsmApp.use('/activity', activity.router);

// Start the server
dsmApp.listen(conf.port, conf.hostName, function () {
    logger.log(0, `Server started at http://${conf.hostName}:${conf.port}`);
});

// Close db connection when app terminates
process
    .on('SIGINT', mongoose.connection.close)
    .on('SIGTERM', mongoose.connection.close);