'use strict';

const conf = require('./config/app.conf');
const path = require('path');
const express = require('express');

var dsmApp = express();

dsmApp.use(express.static(path.join(__dirname, conf.server.clientRoot)));

dsmApp.listen(conf.server.port, conf.server.hostName, function () {
    console.log(`Server started at http://${conf.server.hostName}:${conf.server.port}`);
});