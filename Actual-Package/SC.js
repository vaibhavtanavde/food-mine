const fs = require('fs');
const path = require('path');

// Function to get all JavaScript files in a directory
function getAllJSFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    return jsFiles;
}

// Function to extract functions and variables from a JavaScript file
function extractFunctionsAndVariables(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const functionRegex = /function\s+([^\s\(]+)/g;
    const variableRegex = /(?:const|let|var)\s+([^\s=;]+)/g;

    const functions = [];
    let match;
    while ((match = functionRegex.exec(fileContent)) !== null) {
        functions.push(match[1]);
    }

    const variables = [];
    while ((match = variableRegex.exec(fileContent)) !== null) {
        variables.push(match[1]);
    }

    return { functions, variables };
}

// Function to analyze the relationship between source code and test files
function analyzeSourceTestRelationship(sourceDir, testDir) {
    const sourceFiles = getAllJSFiles(sourceDir);
    const testFiles = getAllJSFiles(testDir);

    const relationshipMap = {};

    sourceFiles.forEach(sourceFile => {
        const sourceFilePath = path.join(sourceDir, sourceFile);
        const { functions, variables } = extractFunctionsAndVariables(sourceFilePath);

        relationshipMap[sourceFile] = {
            linkedTests: []
        };

        testFiles.forEach(testFile => {
            const testFilePath = path.join(testDir, testFile);
            const testContent = fs.readFileSync(testFilePath, 'utf-8');

            functions.forEach(func => {
                if (testContent.includes(func)) {
                    if (!relationshipMap[sourceFile].linkedTests.includes(testFile)) {
                        relationshipMap[sourceFile].linkedTests.push(testFile);
                    }
                }
            });

            variables.forEach(variable => {
                if (testContent.includes(variable)) {
                    if (!relationshipMap[sourceFile].linkedTests.includes(testFile)) {
                        relationshipMap[sourceFile].linkedTests.push(testFile);
                    }
                }
            });
        });
    });

    return relationshipMap;
}

// Usage example:
const sourceDir = './Project';
const testDir = './Project/tests';
const relationshipMap = analyzeSourceTestRelationship(sourceDir, testDir);
console.log(relationshipMap);
