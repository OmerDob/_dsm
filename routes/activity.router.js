'use strict';

const express = require('express');
const activityCtrl = require('../bl/controllers/activity.controller');

var activityRouter = express.Router();

activityRouter
    .get('/', activityCtrl.getAll)
    .get('/:id', activityCtrl.get)
    .post('/', activityCtrl.create)
    .put('/', activityCtrl.update)
    .delete('/:id', activityCtrl.delete);

module.exports = activityRouter;