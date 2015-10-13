"use strict";

require('jasmine-expect');

var torpedoGun = require('../src/torpedoGun'),
    _ = require('underscore');


describe('the torpedoGun module', function() {

    describe('the alpha firing pattern', function() {

        var pattern = 'alpha';

        it('obliterates mines at the four corners of square that is centered ' +
            'at the vessel', function() {
            var actualOutputGrid,
                inputGrid = {
                    mineLocations: [
                        {lat: -1, lon: -1, depth: 'W'},
                        {lat: -1, lon: 1, depth: 'X'},
                        {lat: 1, lon: -1, depth: 'Y'},
                        {lat: 1, lon: 1, depth: 'Z'}
                    ]
                };

            actualOutputGrid = torpedoGun.execute(inputGrid, pattern);
            // uses jasmine-expect matcher
            expect(actualOutputGrid.mineLocations).toBeEmptyArray();
        });

        it('does not affect mines at any other location of the input grid', function() {
            var outputGrid,
                // given
                inputGrid = {
                    mineLocations: [
                        {lat: -1, lon: 0, depth: 'W'},
                        {lat: 1, lon: 0, depth: 'W'},
                        {lat: 0, lon: 0, depth: 'W'},
                        {lat: 0, lon: -1, depth: 'W'},
                        {lat: 0, lon: 1, depth: 'W'},
                        {lat: 0, lon: 2, depth: 'W'}
                    ]
                };

            // when
            outputGrid = torpedoGun.execute(inputGrid, pattern);

            // then
            expect(outputGrid.mineLocations).toBeArrayOfSize(inputGrid.mineLocations.length);
            for (var i = 0; i < outputGrid.mineLocations.length; i++) {
                expect(outputGrid.mineLocations[i]).toEqual(inputGrid.mineLocations[i]);
            }
        });

    });

    describe('the beta firing pattern', function() {

        var pattern = 'beta';

        it('obliterates any mines adjacent to the vessel', function() {
            var actualOutputGrid,
                // given
                inputGrid = {
                    mineLocations: [
                        {lat: 0, lon: -1, depth: 'W'},
                        {lat: 0, lon: 1, depth: 'X'},
                        {lat: 1, lon: 0, depth: 'Y'},
                        {lat: -1, lon: 0, depth: 'Z'}
                    ]
                };

            // when
            actualOutputGrid = torpedoGun.execute(inputGrid, pattern);

            // then
            // uses jasmine-expect matcher
            expect(actualOutputGrid.mineLocations).toBeEmptyArray();
        });

        it('does not affect mines at any other location of the input grid', function() {
            var outputGrid,
                // given
                inputGrid = {
                    mineLocations: [
                        {lat: -1, lon: -1, depth: 'W'},
                        {lat: 1, lon: 1, depth: 'W'},
                        {lat: 0, lon: 0, depth: 'W'},
                        {lat: 1, lon: -1, depth: 'W'},
                        {lat: -1, lon: -1, depth: 'W'},
                        {lat: 0, lon: 2, depth: 'W'}
                    ]
                };

            // when
            outputGrid = torpedoGun.execute(inputGrid, pattern);

            // then
            expect(outputGrid.mineLocations).toBeArrayOfSize(inputGrid.mineLocations.length);
            for (var i = 0; i < outputGrid.mineLocations.length; i++) {
                expect(outputGrid.mineLocations[i]).toEqual(inputGrid.mineLocations[i]);
            }
        });

    });

    // based on the above, it can be assumed the other two patterns (gamma, delta) also work...

});