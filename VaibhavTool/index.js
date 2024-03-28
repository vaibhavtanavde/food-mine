const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const { digraph } = require('graphviz');
const express = require('express');
const fs = require('fs');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// Function to get all TypeScript and JavaScript files recursively in a directory
function getFilesRecursively(folder) {
    const files = [];
    function traverse(currentPath) {
        fs.readdirSync(currentPath).forEach(item => {
            const itemPath = path.join(currentPath, item);
            if (fs.statSync(itemPath).isDirectory()) {
                traverse(itemPath);
            } else if (itemPath.endsWith('.ts') || itemPath.endsWith('.js')) {
                files.push(itemPath);
            }
        });
    }
    traverse(folder);
    return files;
}

// Function to analyze source code files and link them to test cases based on common words
async function linkSourceFilesToTestCases(baseFolderPath, exampleSpecPath) {
    // Create a new graph
    const graph = digraph('G');

    // Analyze the specific Protractor test script to extract test case descriptions
    const testCases = new Map();
    const testFileContent = fs.readFileSync(exampleSpecPath, 'utf8');
    const testCaseRegex = /describe\(['"](.+?)['"]/g;
    let match;
    while ((match = testCaseRegex.exec(testFileContent)) !== null) {
        const testCaseName = cleanTestCaseName(match[1]);
        testCases.set(testCaseName, exampleSpecPath);
    }

    // Get all TypeScript files in the base folder path
    const tsFiles = getFilesRecursively(baseFolderPath).filter(file => file.endsWith('.ts'));

    // Create an object to store file-test case relationships
    const fileTestCaseMap = {};

    // Analyze files and populate the object
    tsFiles.forEach(tsFile => {
        const fileName = path.basename(tsFile);
        const fileContent = fs.readFileSync(tsFile, 'utf8');
        testCases.forEach((testCase, testCaseName) => {
            if (fileContent.includes(testCaseName.toLowerCase())) {
                if (!fileTestCaseMap[fileName]) {
                    fileTestCaseMap[fileName] = [];
                }
                fileTestCaseMap[fileName].push(testCaseName);
            }
        });
    });

    // Add nodes and edges to the graph
    for (const [fileName, testCases] of Object.entries(fileTestCaseMap)) {
        graph.addNode(fileName);
        testCases.forEach(testCase => {
            graph.addNode(testCase);
            graph.addEdge(fileName, testCase);
        });
    }

    // Generate DOT representation of the graph
    const dot = await graph.to_dot();

    // Write the DOT representation to a file
    fs.writeFileSync('graph.dot', dot);

    // Convert DOT file to SVG using Graphviz
    exec('dot -Tsvg graph.dot -o public/graph.svg', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Graph generated as graph.svg');

        // Read the SVG content
        const svgContent = fs.readFileSync('public/graph.svg', 'utf8');
        
        // Send SVG content back to renderer process
        mainWindow.webContents.send('displayGraph', svgContent);
    });
}

// Function to clean and extract test case names
function cleanTestCaseName(testCase) {
    return testCase.replace(/['"]/g, '').trim(); // Remove quotes and trim whitespace
}

// Listen for message from renderer process to start analysis
ipcMain.on('analyze', () => {
    // Call the function to link source files to test cases
    const baseFolderPath = '../foodmine-course/frontend/src';
    const exampleSpecPath = '../testcases/example_spec.js';
    linkSourceFilesToTestCases(baseFolderPath, exampleSpecPath);
});
