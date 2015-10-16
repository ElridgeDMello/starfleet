"use strict";

// reads raw field file content and creates the internal grid datastructure
// used to represent grid state throughout the simulation
// returns the grid object
module.exports.generateGrid = function generateGrid(fieldFileContent) {
    var fieldFileLines,
        height, width,
        maxY, maxX,
        mineLocations = [],
        lineCount = 0,
        currentFieldLine;

    fieldFileLines = fieldFileContent.split('\n');
    height = fieldFileLines.length;   // the number of new lines in the file

    if (height > 0) {   // Y axis
        width = fieldFileLines[0].split('').length; // X axis
    }
    // read and generate grid datastructure
    // these indices will only be correct for a vessel centered within the grid
    // i.e. it is center-able without any changes to input grid
    maxY = Math.floor(height / 2);
    maxX = Math.floor(width / 2);

    // At the top left of the grid the coordinates would be
    // (-maxX, maxY)
    // At the bottom right, the coordinates would be (maxX, -maxY)
    for (var y = maxY, x; y >= -maxY; y--) {
        var charCount = 0;

        currentFieldLine = fieldFileLines[lineCount];
        if(!currentFieldLine) {
            // necessary if line is an empty line
            // (e.g. extra newline at end of field file)
            continue;
        }
        for (x = -maxX; x <= maxX; x++) {
            var currentChar  = currentFieldLine.charAt(charCount).trim();
            if (currentChar.length && currentChar != '.') {
                var mineDetail = createMineLocation(x, y, currentChar);
                mineLocations.push(mineDetail);
            }
            // increment to next char
            charCount++;
        }
        // increment to next line
        lineCount++;
    }

    // This datastructure was used instead of a plain array of objects
    // because I initially went down the path of thinking I would
    // track and update the location of the vessel.
    // Later, however, I decided to use the convention that the grid is
    // centered (0,0) at the vessel, and everything is relative to the vessel
    return {
        mineLocations: mineLocations
    };
};

// private functions

function createMineLocation(x, y, depth) {
    return {
        lat: x,  lon: y,  depth: depth
    };
}

