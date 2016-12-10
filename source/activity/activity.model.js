'use strict';

const mongoose = require('mongoose');
const activitySchema = require('./activity.schema');

module.exports = mongoose.model('Activity', activitySchema);