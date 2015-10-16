"use strict";

var _ = require('underscore');

// returns a new grid after the move has been completed
//
// conforms to an interface function(grid, instruction)
// so as to simplify delegation logic
module.exports.execute = function(grid, pattern) {
    var mineLocationsAsStrings,
        patternLocations,
        patternLocationsAsStrings,
        survivingMinesAsStrings,
        survivingMines;

    // The approach taken here involves converting the
    // location object coordinates to string representations so that the difference between
    // the grid and the firing pattern can easily be found by using a utility function such as
    // _.difference.  This function, however, only returns a difference of basic types and does not
    // do a deep object comparison.

    // A. Translate pattern to array of coordinate objects
    patternLocations = getPatternLocations(pattern);

    // B. map both grid.mineLocations and pattern to coordinate arrays of Strings
    mineLocationsAsStrings = mapToStringCoordRepresentation(grid.mineLocations);
    patternLocationsAsStrings = mapToStringCoordRepresentation(patternLocations);

    // C. find difference between the corresponding String arrays (grid - pattern)
    survivingMinesAsStrings = _.difference(mineLocationsAsStrings, patternLocationsAsStrings);

    // D. filter grid.mineLocations down to ones that survived
    survivingMines = grid.mineLocations.filter(function(mineLoc) {
        return _.contains(survivingMinesAsStrings, generateStringCoordRepresentation(mineLoc));
    });

    // E. (return) filtered grid.mineLocations array based on result of D
    return {
        mineLocations: survivingMines
    };
};


// private functions:

function getPatternLocations(pattern) {
    var ALPHA = [
            {lat: -1, lon: -1}, {lat: -1, lon: 1},
            {lat: 1, lon: -1}, {lat: 1, lon: 1}
        ],
        BETA = [
            {lat: -1, lon: 0}, {lat: 0, lon: -1},
            {lat: 0, lon: 1}, {lat: 1, lon: 0}
        ],
        GAMMA = [
            {lat: -1, lon: 0}, {lat: 0, lon: 0}, {lat: 1, lon: 0}
        ],
        DELTA = [
            {lat: 0, lon: -1}, {lat: 0, lon: 0}, {lat: 0, lon: 1}
        ];

    switch (pattern) {
        case 'alpha':
            return ALPHA;
        case 'beta':
            return BETA;
        case 'gamma':
            return GAMMA;
        case 'delta':
            return DELTA;
        default:
            throw new Error('unknown pattern: ' + pattern);
    }
}

// neccesary to easily find 'difference' the grid and pattern
// since the _.difference function doesn't do a deep compare of objects
function mapToStringCoordRepresentation (locationsArray) {
    return locationsArray.map(function(loc) {
        return generateStringCoordRepresentation(loc);
    });
}

function generateStringCoordRepresentation (loc) {
    return loc.lat + ',' + loc.lon;
}