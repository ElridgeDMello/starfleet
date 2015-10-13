"use strict";

var simulationPrinter = require('../src/simulationPrinter');

describe('the simulationPrinter module', function() {

    describe('the getTextForStep method', function() {
        it('returns Step info based on input', function() {
            expect(simulationPrinter.getTextForStep(3)).toEqual('Step 3\n');
        });
    });

    describe('the getOutputForGrid method', function() {

        describe('mines located equidistant from center in two directions', function() {
            var initialGrid;

            beforeEach(function() {
                initialGrid = {
                    mineLocations: [
                        {lat: 0, lon: -1, depth: 'X'},
                        {lat: 1, lon: 0, depth: 'W'}
                    ]
                };
            });

            it('returns a 3x3 grid with empty locations filled in with dots', function() {
                var expected = '...\n..W\n.X.\n';
                var actual = simulationPrinter.getOutputForGrid(initialGrid);
                expect(actual).toEqual(expected);
            });

        });

        describe('An grid with no mines', function() {
            var inputGrid = { mineLocations: [] };

            it('returns a single cell, empty grid', function() {
                expect(simulationPrinter.getOutputForGrid(inputGrid)).toEqual('.\n');
            });
        });

        describe('A grid with one mine at the center', function() {
            var inputGrid = {
                mineLocations: [
                    {lat: 0, lon: 0, depth: 'B'}
                ]
            };

            it('returns a single cell grid with mine depth value', function() {
                expect(simulationPrinter.getOutputForGrid(inputGrid)).toEqual('B\n');
            });
        });

        describe('mines located at varying distances from center in two directions', function() {
            var initialGrid;

            beforeEach(function() {
                initialGrid = {
                    mineLocations: [
                        {lat: 0, lon: 1, depth: 'Y'},
                        {lat: -2, lon: -1, depth: 'Y'},
                        {lat: 2, lon: -1, depth: 'Y'},
                        {lat: 0, lon: -3, depth: 'Y'}
                    ]
                }
            });

            it('returns a 5x7 grid with two empty rows at the top', function() {
                var expected =  '.....\n' +
                                '.....\n' +
                                '..Y..\n' +
                                '.....\n' +
                                'Y...Y\n' +
                                '.....\n' +
                                '..Y..\n';
                expect(simulationPrinter.getOutputForGrid(initialGrid)).toEqual(expected);
            });

        });

        describe('a single mine located due 2 km to the south of center', function() {
            var initialGrid = {
                mineLocations: [
                    {lat: 0, lon: -2, depth: 'T'}
                ]
            };

            it('generates a single 1x5 grid with the mine displayed', function() {
                var expected =  '.\n' +
                                '.\n' +
                                '.\n' +
                                '.\n' +
                                'T\n';

                expect(simulationPrinter.getOutputForGrid(initialGrid)).toEqual(expected);
            });
        });
    });
});