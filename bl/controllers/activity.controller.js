'use strict';

const activityModel = require('../db/models/activity.model');

module.exports.getAll = function (req, res) {
    activityModel.find({isDeleted: false}).exec()
        .then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            console.error(err);
            res.status(500).send({err: true});
        });
};

module.exports.get = function (req, res) {
    var activityId = req.params.id;

    activityModel.find({id: activityId, isDeleted: false}).exec()
        .then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            console.error(err);
            res.status(500).send({err: true});
        });
};

module.exports.create = function (req, res) {
    var newActivity = new activityModel(req.body.activity);

    newActivity.save()
        .then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            console.error(err);
            res.status(500).send({err: true});
        });
};

module.exports.update = function (req, res) {
    var updatedActivity = req.body.activity;

    activityModel.findByIdAndUpdate(updatedActivity.id, updatedActivity).exec()
        .then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            console.error(err);
            res.status(500).send({err: true});
        });
};

module.exports.delete = function (req, res) {
    var activityId = req.params.id;

    activityModel.findByIdAndUpdate(activityId, {isDeleted: true}).exec()
        .then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            console.error(err);
            res.status(500).send({err: true});
        });
};