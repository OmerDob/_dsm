'use strict';

var appRoutes = [];

appRoutes.push({
    name: '/activity',
    router: './activity.router'
});

module.exports = function (app) {
    for (var i = 0; i < appRoutes.length; i++) {
        app.use(appRoutes[i].name, require(appRoutes[i].router));
    }
};