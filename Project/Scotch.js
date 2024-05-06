//Scotch.js
const fs = require('fs');
const path = require('path');

// Function to recursively get all TypeScript files from a directory
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

// Function to extract functions and classes from a TypeScript file
function extractItems(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const functionRegex = /(?:public|private)?\s+(\w+)\s*\(/g;
    const classRegex = /(?:class)\s+(\w+)\s+/g;

    const functions = [];
    const classes = [];
    let match;

    while ((match = functionRegex.exec(fileContent)) !== null) {
        functions.push(match[1]);
    }

    while ((match = classRegex.exec(fileContent)) !== null) {
        classes.push(match[1]);
    }

    return { functions, classes };
}

// Function to analyze the relationship between source code and test files
function analyzeSourceTestRelationship(sourceFilePaths, testFilePaths) {
    const relationshipMap = {};

    sourceFilePaths.forEach(sourceFilePath => {
        const { functions, classes } = extractItems(sourceFilePath);

        const sourceFileName = path.basename(sourceFilePath);

        relationshipMap[sourceFileName] = { functions: [], classes: [] };

        testFilePaths.forEach(testFilePath => {
            const testContent = fs.readFileSync(testFilePath, 'utf-8');

            functions.forEach(func => {
                if (func !== 'if' && testContent.includes(func)) {
                    relationshipMap[sourceFileName].functions.push({ testFile: testFilePath, linkedFunctions: [func] });
                }
            });

            classes.forEach(cls => {
                if (testContent.includes(cls)) {
                    relationshipMap[sourceFileName].classes.push({ testFile: testFilePath, linkedClasses: [cls] });
                }
            });
        });
    });

    return relationshipMap;
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
const relationshipMap = analyzeSourceTestRelationship(sourceFilePaths, testFilePaths);

// Log the linkage information for each source file
for (const sourceFile in relationshipMap) {
    if (relationshipMap.hasOwnProperty(sourceFile)) {
        console.log(`Linkage information for ${sourceFile}:`);

        if (relationshipMap[sourceFile].functions.length > 0) {
            console.log('Functions:');
            relationshipMap[sourceFile].functions.forEach(item => {
                console.log(`  Test File: ${item.testFile}`);
                console.log(`  Linked Functions: ${item.linkedFunctions.join(', ')}`);
                console.log('--------------------------------------');
            });
        }

        if (relationshipMap[sourceFile].classes.length > 0) {
            console.log('Classes:');
            relationshipMap[sourceFile].classes.forEach(item => {
                console.log(`  Test File: ${item.testFile}`);
                console.log(`  Linked Classes: ${item.linkedClasses.join(', ')}`);
                console.log('--------------------------------------');
            });
        }
    }
}
