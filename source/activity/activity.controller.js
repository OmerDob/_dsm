'use strict';

const activityCrud = require('./activity.crud');
const activityModel = require('./activity.model');

module.exports.getAll = activityCrud.getAll;
module.exports.getById = activityCrud.getById;
module.exports.createActivity = createActivity;
module.exports.updateActivity = updateActivity;
module.exports.deleteActivityById = activityCrud.deleteActivityById;

function createActivity(body) {
    var newActivity = new activityModel(body.activity);

    return newActivity.save();
}

function updateActivity(body) {
    return activityCrud.update(body.activity);
}