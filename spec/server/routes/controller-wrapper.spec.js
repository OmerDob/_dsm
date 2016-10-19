'use strict';

describe('conroller-wrapper', function () {
    var _controllerWrapper;
    var _reqMock;
    var _resMock;
    var _q;

    beforeEach(function () {
        _controllerWrapper = require('../../../routes/controller-wrapper');
        _resMock = require('../mocks/response.mock');
        _q = require('q');
        _reqMock = {};

        // Turn off logging errors to console
        console.error = function () {};

        spyOn(_resMock, 'json').and.callThrough();
        spyOn(_resMock, 'status').and.callThrough();
    });

    it('should unify all request params to one object', function () {
        _reqMock = {
            params: {
                a: 'a',
                b: 2
            },
            body: {
                obj: {
                    prop: 'value'
                }
            },
            query: {
                c: true
            }
        };

        var actionMock = jasmine.createSpy('action');

        var expected = {
            a: 'a',
            b: 2,
            obj: {
                prop: 'value'
            },
            c: true
        };

        _controllerWrapper(actionMock)(_reqMock, _resMock);

        expect(actionMock).toHaveBeenCalledWith(expected);
    });

    it('should send the result when performed sync', function (done) {
        var expected = 'hello wrapper';
        var actionMock = function () {
            return expected;
        };

        _controllerWrapper(actionMock)(_reqMock, _resMock).then(function (r) {
            expect(r).toEqual(expected);
            expect(_resMock.json).toHaveBeenCalledWith(expected);
            done();
        });

    });

    it('should send the result of a promised action', function (done) {
        var deferred = _q.defer();
        var actionMock = function () {
            return deferred.promise;
        };

        var expected = 'promised wrapper';
        deferred.resolve(expected);

        _controllerWrapper(actionMock)(_reqMock, _resMock).then(function (r) {
            expect(r).toEqual(expected);
            expect(_resMock.json).toHaveBeenCalledWith(expected);
            done();
        });
    });

    it('should send an error when sync action throws an error', function (done) {
        var expectedStatus = 500;
        var expectedResult = {err: true};
        var expectedError = 'error';

        var actionMock = function () {
            throw expectedError;
        };

        _controllerWrapper(actionMock)(_reqMock, _resMock).catch(function (e) {
            expect(e).toEqual(expectedError);
            expect(_resMock.status).toHaveBeenCalledWith(expectedStatus);
            expect(_resMock.json).toHaveBeenCalledWith(expectedResult);
            done();
        })
    });

    it('should send an error when promised actions reject', function (done) {
        var deferred = _q.defer();
        var actionMock = function () {
            return deferred.promise;
        };

        var expectedError = 'error';
        var expectedStatus = 500;
        var expectedResult = {err: true};

        deferred.reject(expectedError);

        _controllerWrapper(actionMock)(_reqMock, _resMock).catch(function (e) {
            expect(e).toEqual(expectedError);
            expect(_resMock.status).toHaveBeenCalledWith(expectedStatus);
            expect(_resMock.json).toHaveBeenCalledWith(expectedResult);
            done();
        });
    });
});