"use strict";

var _ = require('underscore');

var A_NEW_LINE = '\n';

// delegate method exposed for internal test
module.exports.getTextForStep = function(stepNumber) {
    return 'Step ' + stepNumber + A_NEW_LINE;
};

// public method
module.exports.printStep = function(stepNumber) {
    console.log(this.getTextForStep(stepNumber));
};

// delegate method for test
module.exports.getOutputForGrid = function(grid) {
    return generateOutputForGrid(grid);
};

// public method
module.exports.printOutputForGrid = function(grid) {
    console.log(this.getOutputForGrid(grid));
};

module.exports.printInstruction = function(instruction) {
    console.log(instruction + A_NEW_LINE);
};

// private functions:
function generateOutputForGrid(grid) {
    var maxLatDistance, maxLonDistance;     // from center
    var gridOutput = '';

    if (grid.mineLocations.length === 0) {
        // no mines
        return '.' + A_NEW_LINE;
    }

    maxLatDistance = _.max(grid.mineLocations.map(function(coord) {
        return Math.abs(coord.lat);
    }));
    maxLonDistance = _.max(grid.mineLocations.map(function(coord) {
        return Math.abs(coord.lon);
    }));

    if (maxLatDistance === 0 && maxLonDistance === 0) {
        // If there are more than one, we ignore all but the first
        // depth value
        return grid.mineLocations[0].depth + A_NEW_LINE;
    }

    for (var y = maxLonDistance; y >= -maxLonDistance; y--) {
        for (var x = -maxLatDistance; x <= maxLatDistance; x++) {
            if (thereIsNoMineAtLocation(grid, {lat: x, lon: y})) {
                gridOutput = gridOutput.concat('.');
            } else {
                gridOutput = gridOutput.concat(depthValueAtLocation(grid, {lat: x, lon: y}));
            }
        }
        if (y !== -maxLonDistance) {
            gridOutput = gridOutput.concat('\n');
        }
    }

    return gridOutput + A_NEW_LINE;
}

function thereIsNoMineAtLocation(grid, latLon) {
    return !_.findWhere(grid.mineLocations, latLon);
}

function depthValueAtLocation(grid, latLon) {
    return _.findWhere(grid.mineLocations, latLon).depth;
}

