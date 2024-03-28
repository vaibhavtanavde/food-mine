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
async function linkSourceFilesToTestCases(baseFolderPath, exampleSpecPath) {
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

    // Create an object to store test methods
    const testMethods = {};

    // Analyze TypeScript files for method calls and populate the testMethods object
    tsFiles.forEach(tsFile => {
        const fileContent = fs.readFileSync(tsFile, 'utf8');
        const methodCallRegex = /(\w+)\.(\w+)\(/g;
        let match;
        while ((match = methodCallRegex.exec(fileContent)) !== null) {
            const caller = match[1];
            const methodName = match[2];
            if (testCases.has(caller)) {
                testMethods[caller] = testMethods[caller] || [];
                if (!testMethods[caller].includes(methodName)) {
                    testMethods[caller].push(methodName);
                }
            }
        }
    });

    // Add nodes and edges to the graph
    for (const [fileName, testCases] of Object.entries(fileTestCaseMap)) {
        graph.addNode(fileName);
        testCases.forEach(testCase => {
            graph.addNode(testCase);
            if (testMethods[testCase]) {
                testMethods[testCase].forEach(method => {
                    graph.addNode(method);
                    graph.addEdge(testCase, method);
                });
            }
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
            const exampleSpecContent = fs.readFileSync(exampleSpecPath, 'utf8'); // Read the content of exampleSpecPath
            const testCasePaths = [...testCases.values()]; // Extract test case paths
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
                        const exampleSpecContent = ${JSON.stringify(exampleSpecContent)}; // Pass exampleSpec.js content as JavaScript string
                        const testCasePaths = ${JSON.stringify(testCasePaths)}; // Pass test case paths as JavaScript array
                        
                        // Attach click event listeners to test case nodes
                        testCasePaths.forEach((testCasePath, index) => {
                            const testCaseNode = document.getElementById('node' + index);
                            if (testCaseNode) {
                                testCaseNode.onclick = () => {
                                    // Display the entire content of the exampleSpec.js file
                                    console.log('Example Spec Content:');
                                    console.log(exampleSpecContent);
                                    alert('Example Spec Content:\\n' + exampleSpecContent);
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

// Function to serve as entry point for using the script as an npm package
function analyzeAndLinkSourceFiles(baseFolderPath, exampleSpecPath) {
  linkSourceFilesToTestCases(baseFolderPath, exampleSpecPath);
}

// Export the function for usage as an npm package
module.exports = analyzeAndLinkSourceFiles;
