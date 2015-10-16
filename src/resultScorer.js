"use strict";

var _ = require('underscore'),
    instructionDictionary = require('../src/instructionDictionary');

// returns pass/fail and the score
module.exports.getOutcome = function(passedMine, hasLeftoverMines,
                                     instructions, executedInstructionCount,
                                     initialMineCount) {
    // cases 1 and 2
    if (passedMine || hasLeftoverMines) {
        return 'fail (0)';
    }

    // case 3
    if (instructions.length > executedInstructionCount) {
        return 'pass (1)';
    }

    // case 4
    return 'pass (' + score(initialMineCount, instructions) + ')';
};

// private functions
function score(initialMineCount, instructions) {
    var finalScore,
        startingScore = 10 * initialMineCount,
        maxShotsFiredDeduction = 5 * initialMineCount,  // max of 5 times intial mine count
        maxMovesDeduction = 3 * initialMineCount, // max of 3 times initial mine count
        numberOfMovesMade,
        numberOfTorpedoShotsFired,
        discreteInstructions;

    // flatten instructions and count
    // the map() returns an array of arrays, which we flatten into a array
    discreteInstructions = _.flatten(instructions.map(function(instruction) {
        return instruction.split(' ');
    }));

    numberOfMovesMade = discreteInstructions.filter(function(instruction) {
        return instructionDictionary.isMoveInstruction(instruction);
    }).length;

    numberOfTorpedoShotsFired = discreteInstructions.filter(function(instruction) {
        return instructionDictionary.isTorpedoInstruction(instruction);
    }).length;

    finalScore = startingScore -
        getMaxOrLower(maxMovesDeduction, numberOfMovesMade * 2) -  // 2 pts per move
        getMaxOrLower(maxShotsFiredDeduction, numberOfTorpedoShotsFired * 5); // 5 points per shot

    return finalScore;
}

function getMaxOrLower(max, number) {
    return (max < number) ? max : number;
}
