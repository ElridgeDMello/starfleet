"use strict";

var simulationPrinter = require('../src/simulationPrinter'),
    instructionExecutor = require('../src/instructionExecutor'),
    dropper = require('../src/dropper'),
    resultScorer = require('../src/resultScorer'),
    _ = require('underscore');

module.exports.simulate = function(grid, instructions) {

    var stepCounter = 0,
        executedInstructions = 0,
        initialMineCount;

    throwIfEmptyInput(grid, instructions);

    initialMineCount = grid.mineLocations.length;

    do {
        stepCounter += 1;
        // print before state
        simulationPrinter.printStep(stepCounter);
        simulationPrinter.printOutputForGrid(grid);

        // print instruction
        simulationPrinter.printInstruction(instructions[executedInstructions]);

        // execute instruction
        grid = instructionExecutor.executeStep(grid, instructions[executedInstructions]);
        executedInstructions++;

        // print after state
        simulationPrinter.printOutputForGrid(grid);
    }
    while (shouldContinueSimulation(grid, instructions, executedInstructions));

    // print outcome
    console.log(
        resultScorer.getOutcome(
            isVesselPastAMine(grid),
            hasLeftoverMines(grid),
            instructions,
            executedInstructions,
            initialMineCount
        ));
};

// private
function throwIfEmptyInput(grid, instructions) {

    if (!grid || !(grid.mineLocations && grid.mineLocations.length)) {
        throw new Error('Grid with no mines');
    }

    if (!instructions || !instructions.length) {
        throw new Error('No instructions supplied');
    }

}

function shouldContinueSimulation(grid, instructions, executedInstructionsCount) {
    var allMinesCleared,
        scriptIsComplete,
        aMineWasPassed;

    allMinesCleared = !hasLeftoverMines(grid);
    scriptIsComplete = executedInstructionsCount >= instructions.length;
    aMineWasPassed = isVesselPastAMine(grid);

    // The simulation is over when:
    // a) all mines are cleared (whether or not there are still instructions to be run)
    // b) the script is completed; or
    // c) the vessel "passed" a mine
    return !(allMinesCleared || scriptIsComplete || aMineWasPassed);
}

function isVesselPastAMine(grid) {
    var depthRepresentations = grid.mineLocations.map(function(mineLocationDetail) {
        return mineLocationDetail.depth;
    });

    return _.contains(depthRepresentations, dropper.getCharForAPassedMine());
}

function hasLeftoverMines(grid) {
    return grid.mineLocations.length > 0;
}