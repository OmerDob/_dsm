'use strict';

const mongoose = require('mongoose');

var schema = mongoose.Schema;

var activitySchema = new schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: String,
    description: String,
    isDeleted: Boolean
});

activitySchema.virtual('duration').get(function () {

});

module.exports = activitySchema;