"use strict";

var _ = require('underscore');

var moveInstructions,
    torpedoInstructions;

// created this dictionary because there were two places we needed to have knowledge about
// which instructions were directional moves, and which were torpedo firing instructions

moveInstructions = ['north', 'south', 'east', 'west'];
torpedoInstructions = ['alpha', 'beta', 'gamma', 'delta'];

module.exports.getMoveInstructions = function() {
    return moveInstructions;
};

module.exports.getTorpedoInstructions = function() {
    return torpedoInstructions;
};

module.exports.isMoveInstruction = function(instruction) {
    return _.contains(moveInstructions, instruction);
};

module.exports.isTorpedoInstruction = function(instruction) {
    return _.contains(torpedoInstructions, instruction);
};
