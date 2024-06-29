//main.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { digraph } = require('graphviz');
const opn = require('opn');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
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
        <div id="error-msg" style="color: red;"></div>
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

    // Check for empty source directory
    if (!sourceDir.trim()) {
        showError('Source directory is required.');
        return;
    }

    // Check for HTML files in source directory
    axios.get('/validate', {
        params: {
            dir: sourceDir,
            ext: '.html'
        }
    })
    .then(response => {
        if (!response.data.success) {
            showError('Source directory does not contain HTML files.');
            return;
        }

        // Check for empty test directory
        if (!testDir.trim()) {
            showError('Test directory is required.');
            return;
        }

        // Check for TS files in test directory
        axios.get('/validate', {
            params: {
                dir: testDir,
                ext: '.ts'
            }
        })
        .then(response => {
            if (!response.data.success) {
                showError('Test directory does not contain TypeScript files.');
                return;
            }

            // Clear any previous error messages
            clearError();

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
                if (error.response && error.response.status === 400) {
                    showError(error.response.data); // Show validation errors from server
                }
            });
        })
        .catch(error => {
            console.error('Error validating test directory:', error);
            showError('An error occurred while validating test directory.');
        });
    })
    .catch(error => {
        console.error('Error validating source directory:', error);
        showError('An error occurred while validating source directory.');
    });
}

function showError(message) {
    document.getElementById('error-msg').textContent = message;
    document.getElementById('graph').innerHTML = ''; // Clear the graph when showing an error
}

function clearError() {
    document.getElementById('error-msg').textContent = '';
}

</script>
</body>
</html>
    `;
    res.send(htmlContent);
});

app.get('/validate', (req, res) => {
    const dir = req.query.dir;
    const ext = req.query.ext;

    const files = scanDirectory(dir, ext);
    const success = Object.keys(files).length > 0;
    
    res.json({ success: success });
});

app.get('/analyze', (req, res) => {
    const sourceDir = req.query.sourceDir;
    const testDir = req.query.testDir;
    const searchQuery = req.query.searchQuery || '';
    const mode = req.query.mode;

    if (!mode) {
        return res.status(400).send('Error: mode parameter is required.');
    }

    if (!sourceDir || !testDir) {
        return res.status(400).send('Error: Source directory and test directory must be provided.');
    }

    const outputDir = process.env.OUTPUT_DIR || __dirname;
    const htmlFiles = scanDirectory(sourceDir, '.html');
    const testFiles = scanDirectory(testDir, '.ts');

    const graph = digraph('G');
    graph.set('rankdir', 'LR');

    const clickableElements = extractClickableElementsFromFiles(htmlFiles);
    const unreferencedElements = {};
    let matchedFiles = new Set();

    for (const [htmlFile, elements] of Object.entries(clickableElements)) {
        const sourceFileName = path.basename(htmlFile);

        if (mode === 'code-to-test' && !sourceFileName.includes(searchQuery)) {
            continue;
        }

        if (sourceFileName.includes(searchQuery)) {
            matchedFiles.add(sourceFileName);
        }

        elements.forEach(element => {
            const usage = findElementUsage(element, testFiles);

            if (usage.length > 0) {
                if (mode === 'code-to-test') {
                    const elementNodeId = `${sourceFileName}-${element}`;
                    graph.addNode(elementNodeId, { shape: 'box', label: element });
                    graph.addEdge(sourceFileName, elementNodeId);

                    usage.forEach(({ file, line, testName }) => {
                        const testFileName = path.basename(file);
                        const lineNodeId = `${testFileName}-${line}`;
                        const lineLabel = `Line ${line}: ${testName}`;
                        graph.addNode(lineNodeId, { shape: 'note', label: lineLabel });
                        graph.addNode(testFileName, { shape: 'ellipse', label: testFileName });
                        graph.addEdge(elementNodeId, lineNodeId);
                        graph.addEdge(lineNodeId, testFileName);
                    });

                } else if (mode === 'test-to-code') {
                    usage.forEach(({ file, line, testName }) => {
                        const testFileName = path.basename(file);
                        if (testFileName.includes(searchQuery)) {
                            matchedFiles.add(testFileName);
                            const lineNodeId = `${testFileName}-${line}`;
                            const elementNodeId = `${element}-${lineNodeId}`;
                            const lineLabel = `Line ${line}: ${testName}`;
                            graph.addNode(lineNodeId, { shape: 'note', label: lineLabel });
                            graph.addNode(testFileName, { shape: 'ellipse', label: testFileName });
                            graph.addNode(elementNodeId, { shape: 'box', label: element });
                            graph.addEdge(testFileName, lineNodeId);
                            graph.addEdge(lineNodeId, elementNodeId);
                            graph.addEdge(elementNodeId, sourceFileName);
                        }
                    });
                }

            } else {
                if (!unreferencedElements[sourceFileName]) {
                    unreferencedElements[sourceFileName] = [];
                }
                unreferencedElements[sourceFileName].push(element);
            }
        });
    }

    if (searchQuery && matchedFiles.size === 0) {
        return res.status(400).send(`Error: No files matched the search query "${searchQuery}".`);
    }

    // Only add unreferenced elements if not in test-to-code mode or if there's no search query
    if (!(mode === 'test-to-code' && searchQuery)) {
        for (const [file, elements] of Object.entries(unreferencedElements)) {
            const sourceFileName = path.basename(file);
            elements.forEach(element => {
                const elementNodeId = `${sourceFileName}-${element}-unref`;
                graph.addNode(elementNodeId, { shape: 'box', label: `${element} (Unreferenced)` });
                graph.addEdge(sourceFileName, elementNodeId, { style: 'dashed', color: 'red' });
            });
        }
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
    
        $('a, button, select, default-button, p').each((index, element) => {
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
            else if (tagName === 'p') {
                // Handle extracting AngularJS or Vue.js expressions from <p> tags
                const angularExpression = $(element).text().trim();
                if (angularExpression.startsWith('{{') && angularExpression.endsWith('}}')) {
                    // Extracting the expression inside {{ ... }}
                    elementText = angularExpression.substring(2, angularExpression.length - 2).trim();
                } else {
                    // Default to the whole text content if not in {{ ... }} format
                    elementText = cleanText($(element).text());
                }
                clickableElements.push(elementText || 'N/A');
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
        const withoutSpecialChars = element.replace(/[\s.-]+/g, '');
        const variableNames = [
            camelCaseName,
            camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1),
            withoutSpecialChars,
            withoutSpecialChars.toLowerCase(),
            withoutSpecialChars.toUpperCase(),
            element.replace(/\s+/g, ''), // Remove spaces
            element.replace(/\s+/g, '').toLowerCase(), // Remove spaces and lowercase
            element.replace(/\s+/g, '').toUpperCase(), // Remove spaces and uppercase
            element.toLowerCase(), // Lowercase
            element.toUpperCase(), // Uppercase
        ];
        
        return variableNames;
    }
    
    function findElementUsage(element, testFiles) {
        const usage = [];
        const seenUsages = new Set();
        const variableNames = generateVariableNames(element);
    
        for (const [filePath, content] of Object.entries(testFiles)) {
            const lines = content.split('\n');
            let currentTestName = '';
    
            lines.forEach((line, index) => {
                // Check if it or describe block starts
                if (line.trim().startsWith('it(') || line.trim().startsWith('describe(')) {
                    const match = line.match(/(it|describe)\(['"](.*?)['"]/);
                    if (match && match[2]) {
                        currentTestName = match[2];
                    }
                }
    
                variableNames.forEach(name => {
                    // Skip matching in it or describe descriptions
                    if (/it\(|describe\(/.test(line)) {
                        return;
                    }
    
                    // Refined regex to match variable usage but avoid matching in comments or strings
                    const regex = new RegExp(`\\b${name}\\b(?!['"])`, 'g');
                    if (regex.test(line)) {
                        const usageKey = `${filePath}-${index + 1}`;
                        if (!seenUsages.has(usageKey)) {
                            seenUsages.add(usageKey);
                            // Push test case name along with line number
                            usage.push({ file: filePath, line: index + 1, testName: currentTestName });
                        }
                    }
                });
            });
        }
    
        return usage;
    }
