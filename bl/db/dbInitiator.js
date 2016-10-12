'use strict';

const config = require('../../config/app.conf');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(config.server.connectionString);
    // mongoose.set('debug', true);
};