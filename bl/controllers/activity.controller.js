'use strict';

const activityModel = require('../db/models/activity.model');

module.exports.getAll = function () {
    return activityModel
        .find({isDeleted: false})
        .exec();
};

// params: {
//     id: mongoObjectId
// }
module.exports.get = function (params) {
    var activityId = params.id;

    return activityModel
        .find({id: activityId, isDeleted: false})
        .exec();
};

// params: {
//     activity: activitySchema
// }
module.exports.create = function (params) {
    var newActivity = new activityModel(params.activity);

    return newActivity.save();
};

// params: {
//     activity: activitySchema
// }
module.exports.update = function (params) {
    var updatedActivity = params.activity;

    return activityModel
        .findByIdAndUpdate(updatedActivity.id, updatedActivity)
        .exec();
};

// params: {
//     id: mongoObjectId
// }
module.exports.delete = function (params) {
    var activityId = params.id;

    return activityModel
        .findByIdAndUpdate(activityId, {isDeleted: true})
        .exec();
};