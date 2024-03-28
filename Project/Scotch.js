const fs = require('fs');
const path = require('path');

// Function to extract functions and variables from a JavaScript file
function extractItems(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const functionRegex = /function\s+([^\s\(]+)/g;

    const functions = [];
    let match;
    while ((match = functionRegex.exec(fileContent)) !== null) {
        functions.push(match[1]);
    }

    return { functions };
}

// Function to analyze the relationship between source code and test files
function analyzeSourceTestRelationship(sourceFilePaths, testFilePaths) {
    const relationshipMap = {};

    sourceFilePaths.forEach(sourceFilePath => {
        const { functions } = extractItems(sourceFilePath);

        const sourceFileName = path.basename(sourceFilePath);

        relationshipMap[sourceFileName] = {
            linkedTests: [],
            linkageInfo: []
        };

        testFilePaths.forEach(testFilePath => {
            const testContent = fs.readFileSync(testFilePath, 'utf-8');

            const linkageInfo = [];

            functions.forEach(func => {
                if (testContent.includes(func)) {
                    if (!relationshipMap[sourceFileName].linkedTests.includes(testFilePath)) {
                        relationshipMap[sourceFileName].linkedTests.push(testFilePath);
                    }
                    linkageInfo.push(`Function/Method: ${func}`);
                }
            });

            if (linkageInfo.length > 0) {
                relationshipMap[sourceFileName].linkageInfo.push({ testFile: testFilePath, linkageInfo });
            }
        });
    });

    return relationshipMap;
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
const relationshipMap = analyzeSourceTestRelationship(sourceFilePaths, testFilePaths);

// Log the linkage information for each source file
for (const sourceFile in relationshipMap) {
    if (relationshipMap.hasOwnProperty(sourceFile)) {
        console.log(`Linkage information for ${sourceFile}:`);
        console.log(relationshipMap[sourceFile].linkageInfo);
    }
}