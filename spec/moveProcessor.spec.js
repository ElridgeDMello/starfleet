"use strict";

var moveProcessor = require('../src/moveProcessor'),
    _ = require('underscore');

describe('the moveProcessor module', function() {
    var initialGrid;

    beforeEach(function() {
        initialGrid = {
            mineLocations: [
                {lat: 1, lon: 1, depth: 'W'},
                {lat: -1, lon: 0, depth: 'X'}
            ]
        };
    });

    it('processes a move of north correctly', function() {
        var expectedGridMineLocations = [
                {lat: 1, lon: 0, depth: 'W'},
                {lat: -1, lon: -1, depth: 'X'}
        ];
        var resultantGrid = moveProcessor.execute(initialGrid, 'north');

        expectedGridMineLocations.forEach(function(expectedMineLocation) {
            expect(_.findWhere(resultantGrid.mineLocations, expectedMineLocation)).
                toBeDefined();
        });
    });

    it('processes a move of south correctly', function() {
        var expectedGridMineLocations = [
                {lat: 1, lon: 2, depth: 'W'},
                {lat: -1, lon: 1, depth: 'X'}
        ];
        var resultantGrid = moveProcessor.execute(initialGrid, 'south');

        expectedGridMineLocations.forEach(function(expectedMineLocation) {
            expect(_.findWhere(resultantGrid.mineLocations, expectedMineLocation)).
                toBeDefined();
        });
    });

    it('processes a move of east correctly', function() {
        var expectedGridMineLocations = [
                {lat: 0, lon: 1, depth: 'W'},
                {lat: -2, lon: 0, depth: 'X'}
        ];
        var resultantGrid = moveProcessor.execute(initialGrid, 'east');

        expectedGridMineLocations.forEach(function(expectedMineLocation) {
            expect(_.findWhere(resultantGrid.mineLocations, expectedMineLocation)).
                toBeDefined();
        });
    });

    it('processes a move of west correctly', function() {
        var expectedGridMineLocations = [
                {lat: 2, lon: 1, depth: 'W'},
                {lat: 0, lon: 0, depth: 'X'}
        ];
        var resultantGrid = moveProcessor.execute(initialGrid, 'west');

        expectedGridMineLocations.forEach(function(expectedMineLocation) {
            expect(_.findWhere(resultantGrid.mineLocations, expectedMineLocation)).
                toBeDefined();
        });
    });

});

