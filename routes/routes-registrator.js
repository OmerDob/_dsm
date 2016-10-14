'use strict';

const ROUTES_MAP = {
    'activity': require('./activity.router')
};

module.exports = function (app) {
    for (var route in ROUTES_MAP) {
        if (ROUTES_MAP.hasOwnProperty(route)) {
            app.use(`/${route}`, ROUTES_MAP[route]);
        }
    }
};