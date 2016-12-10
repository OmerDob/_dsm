'use strict';

const mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
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
    isDeleted: {
        type: Boolean,
        select: false,
        default: false
    }
});

activitySchema.query.notDeleted = function () {
    return this.where({isDeleted: false});
};

// activitySchema.virtual('duration').get(function () {

// });

module.exports = activitySchema;