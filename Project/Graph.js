//Graph.js
const fs = require('fs');
const path = require('path');
const { digraph } = require('graphviz');
const express = require('express');
const opn = require('opn');

// Function to extract functions from a JavaScript file
function extractFunctions(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const functionRegex = /function\s+([^\s\(]+)/g;

    const functions = [];
    let match;
    while ((match = functionRegex.exec(fileContent)) !== null) {
        functions.push(match[1]);
    }

    return functions;
}

// Function to analyze the relationship between source code and test files
function analyzeSourceTestRelationship(sourceFilePaths, testFilePaths) {
    const graph = digraph('G');

    sourceFilePaths.forEach(sourceFilePath => {
        const sourceFileName = path.basename(sourceFilePath);
        const sourceFunctions = extractFunctions(sourceFilePath);

        graph.addNode(sourceFileName);

        testFilePaths.forEach(testFilePath => {
            const testFileName = path.basename(testFilePath);
            const testFileContent = fs.readFileSync(testFilePath, 'utf-8');

            sourceFunctions.forEach(func => {
                if (testFileContent.includes(func)) {
                    graph.addNode(testFileName);
                    graph.addEdge(sourceFileName, testFileName, { label: func });
                }
            });
        });
    });

    return graph;
}

// Directories
const sourceDir = 'C:\\Users\\abc\\Desktop\\Germany\\sUBJECTS\\Thesis\\2301\\food-mine\\Project\\src';
const testDir = 'C:\\Users\\abc\\Desktop\\Germany\\sUBJECTS\\Thesis\\2301\\food-mine\\Project\\tests';

const sourceFilePaths = fs.readdirSync(sourceDir)
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(sourceDir, file));

const testFilePaths = fs.readdirSync(testDir)
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(testDir, file));

// Analyze the relationships
const graph = analyzeSourceTestRelationship(sourceFilePaths, testFilePaths);

// Write the graph to a DOT file
const dotFilePath = 'graph.dot';
graph.output('dot', dotFilePath);

// Generate SVG content from the DOT file
const svgFilePath = 'graph.svg';
const command = `dot -Tsvg ${dotFilePath} -o ${svgFilePath}`;
require('child_process').execSync(command);

// Start an Express server to serve the SVG file
const app = express();
const port = 3000;

// Serve the SVG file
app.get('/', (req, res) => {
    const svgFile = path.join(__dirname, svgFilePath);
    res.sendFile(svgFile);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    // Automatically open the SVG file in the default web browser
    opn(`http://localhost:${port}`);
});
