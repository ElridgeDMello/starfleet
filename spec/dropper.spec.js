"use strict";

require('jasmine-expect');

var dropper = require('../src/dropper'),
    _ = require('underscore');

describe('the dropper module\'s drop function', function() {

    it('returns a grid with the locations depths decremented by one', function() {
        var inputGrid, outputGrid;

        // given
        inputGrid = {
            mineLocations: [
                {lat: -1, lon: 1, depth: 'X'},
                {lat: 0, lon: 1, depth: 'q'},
                {lat: 2, lon: 1, depth: 'a'}
            ]
        };

        // when
        outputGrid = dropper.dropVessel(inputGrid);

        // then
        expect(outputGrid).toEqual({
            mineLocations: [
                {lat: -1, lon: 1, depth: 'W'},
                {lat: 0, lon: 1, depth: 'p'},
                {lat: 2, lon: 1, depth: '*'}
            ]
        });
    });

});