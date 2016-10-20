'use strict';

const dbModelsService = require('../db/db-models.service');
const activityModel = dbModelsService.getModel(dbModelsService.DB_MODELS.Activity);

module.exports.getAll = function () {
    return activityModel
        .find({isDeleted: false})
        .exec();
};

module.exports.get = function (activityId) {
    return activityModel
        .find({id: activityId, isDeleted: false})
        .exec();
};

module.exports.create = function (activity) {
    var newActivity = new activityModel(activity);

    return newActivity.save();
};

module.exports.update = function (updatedActivity) {
    return activityModel
        .findByIdAndUpdate(updatedActivity.id, updatedActivity)
        .exec();
};

module.exports.delete = function (activityId) {
    return activityModel
        .findByIdAndUpdate(activityId, {isDeleted: true})
        .exec();
};