'use strict';

const express = require('express');
const activityCtrl = require('../bl/controllers/activity.controller');
const callToCtrlFunc = require('./controller-wrapper');

var activityRouter = express.Router();

activityRouter
    .get('/', callToCtrlFunc(activityCtrl.getAll))
    .get('/:id', callToCtrlFunc(activityCtrl.get))
    .post('/', callToCtrlFunc(activityCtrl.create))
    .put('/', callToCtrlFunc(activityCtrl.update))
    .delete('/:id', callToCtrlFunc(activityCtrl.delete));

module.exports = activityRouter;