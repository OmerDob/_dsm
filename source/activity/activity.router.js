'use strict';

const express = require('express');

const activityController = require('./activity.controller');
const routerCreator = require('source/shared/router-creator.service');

var activityRouter = routerCreator.createRouter(function (defineAction) {
    defineAction({type: 'get'}, activityController.getAll);
    defineAction({
        type: 'get',
        paramsNames: ['id']
    }, activityController.getById);
    defineAction({type: 'post'}, activityController.createActivity);
    defineAction({type: 'put'}, activityController.updateActivity);
    defineAction({
        type: 'delete',
        paramsNames: ['id']
    }, activityController.deleteActivityById);
});

module.exports = activityRouter;