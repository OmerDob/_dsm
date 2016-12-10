'use strict';

const express = require('express');
const q = require('q');

const logger = require('./logger.service');

const DEFAULT_ACTION_TYPE = 'get';

module.exports = {
    createRouter: createRouter
};

function createRouter(configCallback) {
    var router = express.Router();

    function defineAction(config, action) {
        config = config || {};

        var type = config.type || DEFAULT_ACTION_TYPE;
        var paramsNames = config.paramsNames || [];

        router[type](getActionPath(paramsNames), function (req, res) {
            var actionParams = getActionParams(req, paramsNames);

            var actionPromise = q.Promise(function (resolve, reject) {
                try {
                    var actionResult = action.apply(null, actionParams);

                    resolve(actionResult);
                } catch (e) {
                    reject(e);
                }
            });

            actionPromise.then(function (r) {
                res.json(r);
            }).catch(function (e) {
                logger.log(1, e);
                res.status(500).json({err: true});
            });
        });
    }

    configCallback && configCallback(defineAction);

    return router;
}

function getActionPath(paramsNames) {
    var path = '/';

    for (var i = 0; i < paramsNames.length; i++) {
        path += `:${paramsNames[i]}/`;
    }

    return path;
}

function getActionParams(req, paramsNames) {
    var actionParams = [];

    for (var i = 0; i < paramsNames.length; i++) {
        var currParamName = paramsNames[i];

        actionParams.push(req.params[currParamName]);
    }

    actionParams.push(req.body);
    actionParams.push(req.query);

    return actionParams;
}