'use strict';

describe('controllerCreatorService', function () {
    var _controllerCreatorService;
    var _actionWrapperServiceMock;
    var _proxyquire;

    beforeEach(function () {
        _actionWrapperServiceMock = {
            wrapAction: jasmine.createSpy('wrapAction').and.returnValue(function () {})
        };
        _proxyquire = require('proxyquire');

        _controllerCreatorService = _proxyquire('../../../bl/controllers/controller-creator.service',
            {'./action-wrapper.service': _actionWrapperServiceMock});
    });

    it('should throw an error when not recieving a function in the constructor', function () {
        expect(_controllerCreatorService.controller).toThrow();
    });

    it('should inject an action creation function', function () {
        _controllerCreatorService.controller(function (action) {
            expect(action).toEqual(jasmine.any(Function));
        });
    });

    it('should create an empty controller', function () {
        var actual = new _controllerCreatorService.controller(function (action) {});

        expect(Object.keys(actual).length).toEqual(0);
    });

    it('should create a controller with an action', function () {
        var a = function () {};
        var actual = new _controllerCreatorService.controller(function (action) {
            action('a', a);
        });

        console.log(actual);

        expect(actual.a).toBeDefined();
        expect(actual.a).toEqual(jasmine.any(Function));
        expect(_actionWrapperServiceMock.wrapAction).toHaveBeenCalledWith(a);
    });

    it('should throw an error when action is not defined', function () {
        _controllerCreatorService.controller(function (action) {
            expect(action).toThrow();
        });
    });
});