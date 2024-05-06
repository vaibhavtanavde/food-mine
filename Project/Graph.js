//Graph.js
const fs = require('fs');
const path = require('path');
const { digraph } = require('graphviz');
const express = require('express');
const opn = require('opn');

// Function to extract functions and classes from a TypeScript file
function extractItems(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const functionRegex = /(?:public|private)?\s+(\w+)\s*\(/g;
    const classRegex = /(?:class)\s+(\w+)\s+/g;

    const functions = [];
    const classes = [];
    let match;

    while ((match = functionRegex.exec(fileContent)) !== null) {
        const functionName = match[1];
        // Exclude 'if' function
        if (functionName !== 'if') {
            functions.push(functionName);
        }
    }

    while ((match = classRegex.exec(fileContent)) !== null) {
        classes.push(match[1]);
    }

    return { functions, classes };
}

// Function to recursively find all TypeScript files in a directory
function getAllTypeScriptFiles(dir) {
    let files = fs.readdirSync(dir);
    let tsFiles = [];
    for (let file of files) {
        let filePath = path.join(dir, file);
        let stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            tsFiles = tsFiles.concat(getAllTypeScriptFiles(filePath)); // Recursively search subdirectories
        } else if (file.endsWith('.ts')) {
            tsFiles.push(filePath); // Add TypeScript file to the list
        }
    }
    return tsFiles;
}

// Function to analyze the relationship between source code and test files
function analyzeSourceTestRelationship(sourceFilePaths, testFilePaths) {
    const graph = digraph('G');

    sourceFilePaths.forEach(sourceFilePath => {
        const { functions, classes } = extractItems(sourceFilePath);
        const sourceFileName = path.basename(sourceFilePath);

        graph.addNode(sourceFileName);

        // Add linked functions
        functions.forEach(func => {
            testFilePaths.forEach(testFilePath => {
                const testFileName = path.basename(testFilePath);
                const testFileContent = fs.readFileSync(testFilePath, 'utf-8');

                if (testFileContent.includes(func)) {
                    graph.addNode(testFileName);
                    graph.addEdge(sourceFileName, testFileName, { label: func, color: 'blue' }); // Set function edges to blue
                }
            });
        });

        // Add linked classes
        classes.forEach(cls => {
            testFilePaths.forEach(testFilePath => {
                const testFileName = path.basename(testFilePath);
                const testFileContent = fs.readFileSync(testFilePath, 'utf-8');

                if (testFileContent.includes(cls)) {
                    graph.addNode(testFileName);
                    graph.addEdge(sourceFileName, testFileName, { label: cls, color: 'red' }); // Set class edges to red
                }
            });
        });
    });

    return graph;
}

// Directories
const sourceDir = 'C:\\Users\\abc\\Desktop\\Germany\\sUBJECTS\\Thesis\\2301\\food-mine\\foodmine-course\\frontend\\src\\app\\components\\pages';
const testDir = 'C:\\Users\\abc\\Desktop\\Germany\\sUBJECTS\\Thesis\\2301\\food-mine\\foodmine-course\\tests1';

// Get all TypeScript files in source directory and test directory
const sourceFilePaths = getAllTypeScriptFiles(sourceDir);
const testFilePaths = fs.readdirSync(testDir)
    .filter(file => file.endsWith('.spec.ts')) // Assuming test files have ".spec.ts" extension
    .map(file => path.join(testDir, file));

// Analyze the relationships
const graph = analyzeSourceTestRelationship(sourceFilePaths, testFilePaths);

// Output the graph
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
