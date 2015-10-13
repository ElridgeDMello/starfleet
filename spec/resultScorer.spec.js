"use strict";

var resultScorer = require('../src/resultScorer');

describe('the resultScorer.getOutcome method', function() {

    it('returns a fail(0) if any mines were passed', function() {
        var passedAMine = true;
        expect(resultScorer.getOutcome(passedAMine, false, ['blah'], 1)).toEqual('fail (0)');
    });

    it('returns a fail(0) if has leftover mines after script completes', function() {
        var hasLeftoverMines = true;
        expect(resultScorer.getOutcome(false, hasLeftoverMines, ['blah'], 1)).toEqual('fail (0)');
    });

    describe('when all mines are cleared', function() {

        describe('but there are still instructions to be run', function() {

            it('returns a score of pass (1)', function() {
                expect(resultScorer.getOutcome(false, false, ['blah', 'yadi'], 1)).toEqual('pass (1)');
            });

        });

        describe('and there are no more instructions to be run', function() {

            it('computes score based on instructions and initialMineCount', function() {
                var instructions,
                    initialMineCount = 4;

                instructions = ['north', 'delta south', 'west', 'gamma east', 'east',
                    'gamma west', 'south', 'delta'];

                expect(resultScorer.getOutcome(false, false, instructions, 8, initialMineCount)).
                    toEqual('pass (8)');
            });
        });

    });
});