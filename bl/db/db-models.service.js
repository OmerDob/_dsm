'use strict';

const mongoose = require('mongoose');

const DB_MODELS = {
    Activity: 'Activity'
};

var appModels = [];

appModels.push({
    modelName: DB_MODELS.Activity,
    schemaPath: './schemas/activity.schema'
});

module.exports.DB_MODELS = DB_MODELS;

module.exports.initModels = function () {
    for (var i = 0; i < appModels.length; i++) {
        var modelData = appModels[i];
        mongoose.model(modelData.modelName, require(modelData.schemaPath));
    }
};

module.exports.getModel = function (modelName) {
    return mongoose.model(modelName);
};