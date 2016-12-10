'use strict';

const activityModel = require('./activity.model');

module.exports = {
    getAll: getAll,
    getById: getById,
    update: update,
    deleteActivityById: deleteActivityById
};

function getAll() {
    return activityModel
        .find()
        .notDeleted()
        .exec();
}

function getById(activityId) {
    return activityModel
        .findById(activityId)
        .notDeleted()
        .exec();
}

function update(updatedActivity) {
    return activityModel
        .findByIdAndUpdate(updatedActivity.id, updatedActivity)
        .exec();
}

function deleteActivityById(activityId) {
    return activityModel
        .findByIdAndUpdate(activityId, {isDeleted: true})
        .exec();
}