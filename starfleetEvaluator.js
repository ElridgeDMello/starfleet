"use strict";

var fs = require('fs'),
    fieldFileReader = require('./src/fieldFileReader'),
    simulationController = require('./src/simulationController');

var ENCODING = 'utf8';

// The "main" program that reads the content of the files specified
// by the command line args and kicks off the simulation by delegating
// to the simulationController
(function initialize() {
    var fieldFilePath,
        fieldFileContent,
        grid,
        instructions = [],
        scriptFilePath,
        scriptFileContent;

    // first command line arg to 'node starfleetEvaluator.js'
    fieldFilePath = process.argv[2].trim();
    // second command line arg to 'node starfleetEvaluator.js'
    scriptFilePath = process.argv[3].trim();

    // keep it simple, read synchronously, not recommended for large files:
    fieldFileContent = fs.readFileSync(fieldFilePath, ENCODING);
    scriptFileContent = fs.readFileSync(scriptFilePath, ENCODING);

    grid = fieldFileReader.generateGrid(fieldFileContent);
    instructions = parseInstructions(scriptFileContent);

    // delegate to controller
    simulationController.simulate(grid, instructions);

})();


// private

function parseInstructions(scriptFileContent) {
    return scriptFileContent.split('\n');
}