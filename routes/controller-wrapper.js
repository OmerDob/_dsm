'use strict';

const q = require('q');

Object.prototype.concat = function (obj) {
    if (typeof obj === 'object') {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                this[key] = obj[key];
            }
        }
    }

    return this;
};

function handleError(e, res) {
    console.error(e);
    res.status(500).json({err: true});
}

module.exports = function (action) {
    return function (req, res) {
        if (action && typeof action === 'function') {
            var params = {}.concat(req.params).concat(req.body).concat(req.query);
            
            try {
                var actionResult = q(action(params));

                return actionResult.then(function (r) {
                    res.json(r);

                    return r;
                }).catch(function (e) {
                    handleError(e, res);

                    throw e;
                });
            } catch (e) {
                handleError(e, res);
                
                return q.reject(e);
            }
        } else {
            var e = 'action should be a function.';
            handleError(e, res);

            return q.reject(e);
        }
    };
};