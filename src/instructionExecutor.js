"use strict";

var dropper = require('../src/dropper'),
    moveProcessor = require('../src/moveProcessor'),
    torpedoGun = require('../src/torpedoGun'),
    instructionDictionary = require('../src/instructionDictionary');

var instructionDelegate;

module.exports.executeStep = function(grid, instruction) {

    // empty instruction, simply drop
    if (!instruction.trim()) {
        return dropper.dropVessel(grid);
    }

    // executes move and torpedo firing, returning new state
    grid = delegateInstructionExecution(grid, instruction);

    // always drop vessel, then return
    return dropper.dropVessel(grid);
};

// private functions

(function initializeInstructionDelegateMap() {
    var moveInstructions = instructionDictionary.getMoveInstructions(),
        torpedoInstructions = instructionDictionary.getTorpedoInstructions();

    instructionDelegate = {};

    moveInstructions.forEach(function(moveInstruction) {
        instructionDelegate[moveInstruction] = moveProcessor;
    });
    torpedoInstructions.forEach(function(torpedoInstruction) {
        instructionDelegate[torpedoInstruction] = torpedoGun;
    });

})();

function getDelegate(delegateInstruction) {
    return instructionDelegate[delegateInstruction];
}

function delegateInstructionExecution(grid, instruction) {
    var subInstructions,
        theDelegate;

    subInstructions = instruction.split(' ');
    subInstructions.forEach(function(subInstruction) {
        theDelegate = getDelegate(subInstruction);
        if (theDelegate) {
            // could be either the moveProcessor or the torpedoGun.
            // both have the same execute method interface taking
            // the arguments (grid, instruction) so that the logic
            // to do the delegation could be kept simple
            grid = theDelegate.execute(grid, subInstruction);
        }
    });

    return grid;
}