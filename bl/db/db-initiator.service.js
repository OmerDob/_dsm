'use strict';

const config = require('../../config/app.conf');
const mongoose = require('mongoose');
const dbModelsService = require('./db-models.service');

module.exports = function () {
    mongoose.connect(config.server.connectionString);
    mongoose.Promise = require('q').Promise; 
    // mongoose.set('debug', true);

    dbModelsService.initModels();
};