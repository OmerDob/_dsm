'use strict';

const conf = require('./config/app.conf');
const path = require('path');
const express = require('express');

const initDb = require('./bl/db/dbInitiator');
const registerRoutes = require('./routes/routes-registrator');

var dsmApp = express();

initDb();

// Expose client side
dsmApp.use(express.static(path.join(__dirname, conf.server.clientRoot)));

registerRoutes(dsmApp);

// Start server
dsmApp.listen(conf.server.port, conf.server.hostName, function () {
    console.log(`Server started at http://${conf.server.hostName}:${conf.server.port}`);
});