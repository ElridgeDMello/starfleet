"use strict";

// reads raw field file content and creates the internal grid datastructure
// used to represent grid state throughout the simulation
module.exports.generateGrid = function generateGrid(fieldFileContent) {
    var fieldFileLines,
        height, width,
        maxY, maxX,
        mineLocations = [],
        lineCount = 0,
        currentFieldLine;

    fieldFileLines = fieldFileContent.split('\n');
    height = fieldFileLines.length;   // the number of new lines in the file

    if (height > 0) {
        width = fieldFileLines[0].split('').length;
    }
    // read and generate grid datastructure
    // these indices will only be correct for a vessel centered within the grid
    // i.e. it is center-able without any changes to input grid
    maxY = Math.floor(height / 2);
    maxX = Math.floor(width / 2);

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

