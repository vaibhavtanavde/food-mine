//main.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { digraph } = require('graphviz');
const opn = require('opn');
const axios = require('axios');

const app = express();
const port = 3000;

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Source-Test Relationship Analyzer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            margin: 20px auto;
            padding: 20px;
            max-width: 600px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            margin-top: 0;
        }
        label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"] {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
        button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        #graph {
            margin-top: 20px;
        }
        .search-container {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Code-to-Test Tracelinks</h2>
        <label for="sourceDir">Source Directory:</label>
        <input type="text" id="sourceDir" placeholder="Enter source directory path"><br>
        <label for="testDir">Test Directory:</label>
        <input type="text" id="testDir" placeholder="Enter test directory path"><br>
        <div class="search-container">
            <label for="searchQuery">Search:</label>
            <input type="text" id="searchQuery" placeholder="Enter search query"><br>
        </div>
        <button onclick="analyze()">Analyze</button>
        <div id="graph"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/viz.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/wasm"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/full.render.js"></script>
    <script>
        function analyze() {
            const sourceDir = document.getElementById('sourceDir').value;
            const testDir = document.getElementById('testDir').value;
            const searchQuery = document.getElementById('searchQuery').value;

            axios.get('/analyze', {
                params: {
                    sourceDir: sourceDir,
                    testDir: testDir,
                    searchQuery: searchQuery
                }
            })
            .then(response => {
                document.getElementById('graph').innerHTML = response.data;
                document.querySelector('.search-container').style.display = 'block'; // Display search container after analyzing
            })
            .catch(error => {
                console.error('Error analyzing:', error);
            });
        }
    </script>
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send(htmlContent);
});

app.get('/analyze', (req, res) => {
    const sourceDir = req.query.sourceDir;
    const testDir = req.query.testDir;
    const searchQuery = req.query.searchQuery || '';

    const outputDir = process.env.OUTPUT_DIR || __dirname; 
    const sourceFilePaths = getAllTypeScriptFiles(sourceDir);
    const testFilePaths = fs.readdirSync(testDir)
        .filter(file => file.endsWith('.spec.ts'))
        .map(file => path.join(testDir, file));

    const graph = analyzeSourceTestRelationship(sourceFilePaths, testFilePaths, searchQuery);

    const dotFilePath = path.join(outputDir, 'graph.dot');
    graph.output('dot', dotFilePath);

    const svgFilePath = path.join(outputDir, 'graph.svg');
    const command = `dot -Tsvg ${dotFilePath} -o ${svgFilePath}`;
    require('child_process').execSync(command);

    const svgFile = fs.readFileSync(svgFilePath, 'utf-8');
    res.send(svgFile);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    opn(`http://localhost:${port}`);
});

function getAllTypeScriptFiles(dir) {
    let files = fs.readdirSync(dir);
    let tsFiles = [];
    for (let file of files) {
        let filePath = path.join(dir, file);
        let stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            tsFiles = tsFiles.concat(getAllTypeScriptFiles(filePath));
        } else if (file.endsWith('.ts')) {
            tsFiles.push(filePath);
        }
    }
    return tsFiles;
}

function extractItems(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const functionRegex = /(?:public|private)?\s+(\w+)\s*\(/g;
    const classRegex = /(?:class)\s+(\w+)\s+/g;

    const functions = [];
    const classes = [];
    let match;

    while ((match = functionRegex.exec(fileContent)) !== null) {
        const functionName = match[1];
        if (functionName !== 'if' && functionName !== 'log') {
            functions.push(functionName);
        }
    }
    

    while ((match = classRegex.exec(fileContent)) !== null) {
        classes.push(match[1]);
    }

    return { functions, classes };
}

function analyzeSourceTestRelationship(sourceFilePaths, testFilePaths, searchQuery) {
    const graph = digraph('G');

    
    const filesWithDependencies = new Set();
    const addedEdges = new Set();

    sourceFilePaths.forEach(sourceFilePath => {
        const sourceFileName = path.basename(sourceFilePath);
        if (!sourceFileName.includes(searchQuery)) {
            return; 
        }

        const { functions, classes } = extractItems(sourceFilePath);

        functions.forEach(func => {
            testFilePaths.forEach(testFilePath => {
                const testFileName = path.basename(testFilePath);
                const testFileContent = fs.readFileSync(testFilePath, 'utf-8');

                const htmlFilePath = sourceFilePath.replace('.ts', '.html');
                if (fs.existsSync(htmlFilePath)) {
                    const htmlFileName = path.basename(htmlFilePath);
                    const htmlFileContent = fs.readFileSync(htmlFilePath, 'utf-8');

                    if (htmlFileContent.includes(func) && testFileContent.includes(func)) {
                        filesWithDependencies.add(htmlFileName);
                        filesWithDependencies.add(testFileName);

                        const lineNumbers = getAllLineNumbers(testFileContent, func);

                        lineNumbers.forEach(lineNumber => {
                            const testCaseName = getTestCaseName(testFileContent, lineNumber);
                            if (testCaseName) {
                                const edgeId = `${testFileName}-${testCaseName}`;
                                if (!addedEdges.has(edgeId)) {
                                    console.log(`Function '${func}' referenced in test case: '${testCaseName}' in file: '${testFileName}' at line: ${lineNumber}`);
                                    graph.addNode(`${testFileName}-${testCaseName}`, { shape: 'box', label: testCaseName });
                                    graph.addEdge(testFileName, `${testFileName}-${testCaseName}`, { style: 'dotted' });
                                    addedEdges.add(edgeId);
                                }
                            }
                        });

                        graph.addEdge(htmlFileName, sourceFileName, { label: func });
                        graph.addEdge(sourceFileName, testFileName, { label: `${func} (Lines ${lineNumbers.join(', ')})` });
                    }
                }
            });
        });

        classes.forEach(cls => {
            testFilePaths.forEach(testFilePath => {
                const testFileName = path.basename(testFilePath);
                const testFileContent = fs.readFileSync(testFilePath, 'utf-8');

                const htmlFilePath = sourceFilePath.replace('.ts', '.html');
                if (fs.existsSync(htmlFilePath)) {
                    const htmlFileName = path.basename(htmlFilePath);
                    const htmlFileContent = fs.readFileSync(htmlFilePath, 'utf-8');

                    if (htmlFileContent.includes(cls) && testFileContent.includes(cls)) {
                        filesWithDependencies.add(htmlFileName);
                        filesWithDependencies.add(testFileName);

                        const lineNumbers = getAllLineNumbers(testFileContent, cls);

                        lineNumbers.forEach(lineNumber => {
                            const testCaseName = getTestCaseName(testFileContent, lineNumber);
                            if (testCaseName) {
                                const edgeId = `${testFileName}-${testCaseName}`;
                                if (!addedEdges.has(edgeId)) {
                                    console.log(`Class '${cls}' referenced in test case: '${testCaseName}' in file: '${testFileName}' at line: ${lineNumber}`);
                                    graph.addNode(`${testFileName}-${testCaseName}`, { shape: 'box', label: testCaseName });
                                    graph.addEdge(testFileName, `${testFileName}-${testCaseName}`, { style: 'dotted' });
                                    addedEdges.add(edgeId);
                                }
                            }
                        });

                        graph.addEdge(htmlFileName, sourceFileName, { label: cls});
                        graph.addEdge(sourceFileName, testFileName, { label: `${cls} (Lines ${lineNumbers.join(', ')})` });
                    }
                }
            });
        });
    });

    filesWithDependencies.forEach(fileName => {
        graph.addNode(fileName);
    });

    return graph;
}


function getAllLineNumbers(fileContent, item) {
    const lines = fileContent.split('\n');
    const lineNumbers = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(item)) {
            lineNumbers.push(i + 1); 
        }
    }
    return lineNumbers;
}

function getTestCaseName(fileContent, lineNumber) {
    const lines = fileContent.split('\n');
    for (let i = lineNumber - 1; i >= 0; i--) {
        const line = lines[i];
        if (line.trim().startsWith('it(')) {
            const match = line.match(/'([^']+)'/);
            if (match) {
                return match[1];
            }
        }
    }
    return null;
}
