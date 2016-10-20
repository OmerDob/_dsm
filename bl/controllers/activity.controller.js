'use strict';

const activityCrud = require('../cruds/activity.crud');

module.exports.getAll = function () {
    return activityCrud.getAll();
};

// params: {
//     id: mongoObjectId
// }
module.exports.get = function (params) {
    return activityCrud.get(params.id)
};

// params: {
//     activity: activitySchema
// }
module.exports.create = function (params) {
    return activityCrud.create(params.activity);
};

// params: {
//     activity: activitySchema
// }
module.exports.update = function (params) {
    return activityCrud.update(params.activity);
};

// params: {
//     id: mongoObjectId
// }
module.exports.delete = function (params) {
    return activityCrud.delete(params.id);
};