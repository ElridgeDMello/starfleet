"use strict";

// returns a new grid after the move has been completed
//
// conforms to an interface function(grid, instruction)
// so as to simplify delegation logic
module.exports.execute = function(initialGrid, moveDirection) {

    var movedGrid;

    switch (moveDirection) {
        case 'north':
            movedGrid = addToLons(initialGrid, -1);
            break;
        case 'south':
            movedGrid = addToLons(initialGrid, 1);
            break;
        case 'west':
            movedGrid = addToLats(initialGrid, 1);
            break;
        case 'east':
            movedGrid = addToLats(initialGrid, -1);
            break;
        default:
            throw new Error('unknown move direction: ' + moveDirection);
    }

    return movedGrid;
};

// private functions:
function addToLons(grid, addendum) {
    var postMoveGrid = {};
    postMoveGrid.mineLocations = grid.mineLocations.map(function(coord) {
        return {lat: coord.lat, lon: coord.lon + addendum, depth: coord.depth};
    });
    return postMoveGrid;
}

function addToLats(grid, addendum) {
    var postMoveGrid = {};
    postMoveGrid.mineLocations = grid.mineLocations.map(function(coord) {
        return {lat: coord.lat + addendum, lon: coord.lon, depth: coord.depth};
    });
    return postMoveGrid;
}
