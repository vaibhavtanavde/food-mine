const express = require('express');
const fs = require('fs');
const path = require('path');
const { digraph } = require('graphviz');
const opn = require('opn');
const axios = require('axios');
const cheerio = require('cheerio');

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
        <div id="radioButtons" style="display: none;">
            <input type="radio" id="codeToTest" name="mode" value="code-to-test" checked>
            <label for="codeToTest">Code-to-Test</label>
            <input type="radio" id="testToCode" name="mode" value="test-to-code">
            <label for="testToCode">Test-to-Code</label>
        </div>
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
            const mode = document.querySelector('input[name="mode"]:checked').value;

            axios.get('/analyze', {
                params: {
                    sourceDir: sourceDir,
                    testDir: testDir,
                    searchQuery: searchQuery,
                    mode: mode
                }
            })
            .then(response => {
                document.getElementById('graph').innerHTML = response.data;
                document.querySelector('.search-container').style.display = 'block'; // Display search container after analyzing
                document.getElementById('radioButtons').style.display = 'block'; // Display radio buttons after analyzing
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
    const mode = req.query.mode; // mode parameter is now required

    if (!mode) {
        return res.status(400).send('Error: mode parameter is required.');
    }

    const outputDir = process.env.OUTPUT_DIR || __dirname;
    const htmlFiles = scanDirectory(sourceDir, '.html');
    const testFiles = scanDirectory(testDir, '.ts');

    const graph = digraph('G');
    graph.set('rankdir', 'LR'); // Set the rank direction to left-to-right

    const clickableElements = extractClickableElementsFromFiles(htmlFiles);

    for (const [htmlFile, elements] of Object.entries(clickableElements)) {
        const sourceFileName = path.basename(htmlFile);

        if (!sourceFileName.includes(searchQuery)) {
            continue;
        }

        elements.forEach(element => {
            const usage = findElementUsage(element, testFiles);

            if (usage.length > 0) {
                if (mode === 'code-to-test') {
                    // Code-to-Test mode: UI element on left, HTML and test file in middle, line number on right
                    const elementNodeId = `${sourceFileName}-${element}`;
                    graph.addNode(elementNodeId, { shape: 'box', label: element });
                    graph.addEdge(sourceFileName, elementNodeId);

                    usage.forEach(({ file, line }) => {
                        const testFileName = path.basename(file);
                        const lineNodeId = `${testFileName}-${line}`;

                        graph.addNode(testFileName, { shape: 'ellipse', label: testFileName });
                        graph.addNode(lineNodeId, { shape: 'note', label: `Line ${line}` });

                        graph.addEdge(elementNodeId, lineNodeId);
                        graph.addEdge(lineNodeId, testFileName);
                    });
                } else if (mode === 'test-to-code') {
                    // Test-to-Code mode: Test file on left, line number and UI element in middle, HTML file on right
                    usage.forEach(({ file, line }) => {
                        const testFileName = path.basename(file);
                        const lineNodeId = `${testFileName}-${line}`;
                        const elementNodeId = `${element}-${lineNodeId}`;

                        graph.addNode(testFileName, { shape: 'ellipse', label: testFileName });
                        graph.addNode(lineNodeId, { shape: 'note', label: `Line ${line}` });
                        graph.addNode(elementNodeId, { shape: 'box', label: element });

                        graph.addEdge(testFileName, lineNodeId);
                        graph.addEdge(lineNodeId, elementNodeId);
                        graph.addEdge(elementNodeId, sourceFileName);
                    });
                }
            }
        });
    }

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

function scanDirectory(dir, ext) {
    const results = {};

    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            Object.assign(results, scanDirectory(fullPath, ext));
        } else if (stat.isFile() && path.extname(fullPath) === ext) {
            const content = fs.readFileSync(fullPath, 'utf8');
            results[fullPath] = content;
        }
    });

    return results;
}

function cleanText(text) {
    return text.replace(/\s+/g, ' ').trim().replace(/[{}()]/g, '').trim();
}

function extractClickableElements(htmlContent) {
    const $ = cheerio.load(htmlContent);
    const clickableElements = [];

    $('a, button, select, default-button').each((index, element) => {
        const tagName = element.tagName.toLowerCase();
        let elementText = '';

        if (tagName === 'a') {
            elementText = cleanText($(element).text());
            clickableElements.push(elementText || 'N/A');
        } else if (tagName === 'button') {
            elementText = cleanText($(element).text());
            clickableElements.push(elementText || 'N/A');
        } else if (tagName === 'select') {
            const valueBinding = cleanText($(element).attr('value') || $(element).attr('[value]') || $(element).attr('ng-reflect-value') || '');
            const textBinding = cleanText($(element).attr('id') || 'N/A');
            const contextText = valueBinding || textBinding;
            clickableElements.push(contextText);
        } else if (tagName === 'default-button') {
            elementText = cleanText($(element).attr('text') || 'N/A');
            clickableElements.push(elementText);
        }
    });

    return clickableElements;
}

function extractClickableElementsFromFiles(htmlFiles) {
    const clickableElements = {};
    for (const [file, content] of Object.entries(htmlFiles)) {
        const elements = extractClickableElements(content);
        if (elements.length > 0) {
            clickableElements[file] = elements;
        }
    }
    return clickableElements;
}

function toCamelCase(str) {
    return str
        .replace(/[-_\s.]+(.)?/g, (_, chr) => chr ? chr.toUpperCase() : '')
        .replace(/^(.)/, (_, chr) => chr.toLowerCase());
}

function generateVariableNames(element) {
    const camelCaseName = toCamelCase(element);
    return [
        camelCaseName,
        camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)
    ];
}

function findElementUsage(element, testFiles) {
    const usage = [];
    const seenUsages = new Set();
    const variableNames = generateVariableNames(element);

    for (const [filePath, content] of Object.entries(testFiles)) {
        const lines = content.split('\n');
        lines.forEach((line, index) => {
            variableNames.forEach(name => {
                if (line.includes(name)) {
                    const usageKey = `${filePath}-${index + 1}`;
                    if (!seenUsages.has(usageKey)) {
                        seenUsages.add(usageKey);
                        usage.push({ file: filePath, line: index + 1 });
                    }
                }
            });
        });
    }

    return usage;
}
