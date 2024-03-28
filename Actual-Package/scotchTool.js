// Import required modules
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { digraph } = require('graphviz');
const express = require('express');
const opn = require('opn'); // Import the 'opn' module

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
async function linkSourceFilesToTestCases() {
    // Specify your project-specific paths
    const baseFolderPath = '../foodmine-course/frontend/src';
    const exampleSpecPath = '../testcases/example_spec.js'; // Path to the specific JavaScript file

    // Create a new graph
    const graph = digraph('G');

    // Analyze the specific Protractor test script to extract test case descriptions
    const testCases = new Map();
    const testFileContent = fs.readFileSync(exampleSpecPath, 'utf8');
    const testCaseRegex = /describe\(['"](.+?)['"]/g; // Regex to match describe blocks
    let match;
    while ((match = testCaseRegex.exec(testFileContent)) !== null) {
        const testCaseName = cleanTestCaseName(match[1]);
        testCases.set(testCaseName, exampleSpecPath); // Store the test case name and path to test file
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

        // Start an Express server to serve the HTML file containing the SVG image and overlay
        const app = express();
        const port = 3000;
        app.use(express.static('public'));

        // Serve the HTML file containing the SVG image and overlay
        app.get('/', (req, res) => {
            const svgContent = fs.readFileSync('public/graph.svg', 'utf8');
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>SVG Image with Click Functionality</title>
                    <style>
                        /* Add CSS styles as needed */
                        #overlay {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: transparent;
                        }
                    </style>
                </head>
                <body>
                    ${svgContent}
                    <div id="overlay"></div>
                    <script>
                        const testCases = ${JSON.stringify([...testCases.keys()])};
                        const testCasePaths = ${JSON.stringify([...testCases.values()])};
                        const overlay = document.getElementById('overlay');
                        
                        // Attach click event listeners to test case nodes
                        testCases.forEach((testCase, index) => {
                            const testCaseNode = document.getElementById('node' + index);
                            if (testCaseNode) {
                                testCaseNode.onclick = () => {
                                    const testCaseName = testCase;
                                    const testCasePath = testCasePaths[index];
                                    // Fetch and display the test case code
                                    fetch(testCasePath)
                                        .then(response => response.text())
                                        .then(data => {
                                            console.log('Test Case Code:');
                                            console.log(data);
                                            alert('Test Case Code:\\n' + data);
                                        })
                                        .catch(error => {
                                            console.error('Error fetching test case code:', error);
                                        });
                                };
                            } else {
                                console.warn(\`Node 'node\${index}' not found.\`);
                            }
                        });
                    </script>
                </body>
                </html>
            `);
        });

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
            // Automatically open the HTML file in the default web browser
            opn(`http://localhost:${port}`);
        });
    });
}

// Function to clean and extract test case names
function cleanTestCaseName(testCase) {
    return testCase.replace(/['"]/g, '').trim(); // Remove quotes and trim whitespace
}

// Call the function to link source files to test cases
linkSourceFilesToTestCases();
