//keep this code to show which code is related to which test case
//use this code in tool

const fs = require('fs');
const path = require('path');

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

// Specify your project-specific paths
const baseFolderPath = '../foodmine-course/frontend/src';
const exampleSpecPath = '../testcases/example_spec.js'; // Path to the specific JavaScript file

// Analyze the specific Protractor test script to extract test case descriptions
const testCases = new Map();
const testFileContent = fs.readFileSync(exampleSpecPath, 'utf8');
const testCaseRegex = /describe\(['"](.+?)['"]/g; // Regex to match describe blocks
let match;
while ((match = testCaseRegex.exec(testFileContent)) !== null) {
  const testCaseName = cleanTestCaseName(match[1]);
  testCases.set(testCaseName, []);
}

// Get all TypeScript files in the base folder path
const tsFiles = getFilesRecursively(baseFolderPath).filter(file => file.endsWith('.ts'));

// Function to analyze source code files and link them to test cases based on common words
function linkSourceFilesToTestCases() {
  tsFiles.forEach(tsFile => {
    const fileName = path.basename(tsFile, path.extname(tsFile));
    const fileContent = fs.readFileSync(tsFile, 'utf8');
    testCases.forEach((testCase, testCaseName) => {
      if (fileContent.includes(testCaseName.toLowerCase())) {
        testCases.get(testCaseName).push(fileName);
      }
    });
  });
}

// Execute the linking process
linkSourceFilesToTestCases();

// Print the linked test cases and source files
console.log('Linked source code and test cases files:');
tsFiles.forEach(sourceFile => {
  const fileName = path.basename(sourceFile);
  const fileContent = fs.readFileSync(sourceFile, 'utf8');
  testCases.forEach((_, testCase) => {
    if (fileContent.includes(testCase.toLowerCase())) {
      console.log(`${fileName} is linked to ${testCase}`);
    }
  });
});

// Function to clean and extract test case names
function cleanTestCaseName(testCase) {
  return testCase.replace(/['"]/g, '').trim(); // Remove quotes and trim whitespace
}

//keep this code to show which code is related to which test case
//use this code in tool