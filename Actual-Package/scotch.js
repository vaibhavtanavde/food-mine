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

// Analyze TypeScript and JavaScript files for method calls, variables, and functions
function analyzeFile(filePath, callGraph) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const methodCallRegex = /\.(\w+)\(/g;
  const variableFunctionRegex = /(?:let|const|var|function)\s+(\w+)/g;

  // Extract method calls
  let match;
  while ((match = methodCallRegex.exec(fileContent)) !== null) {
    const method = match[1];
    callGraph[filePath] = callGraph[filePath] || new Set();
    callGraph[filePath].add({ method, line: getLineNumber(fileContent, match.index) });
  }

  // Extract variables and functions
  while ((match = variableFunctionRegex.exec(fileContent)) !== null) {
    const variableFunction = match[1];
    callGraph[filePath] = callGraph[filePath] || new Set();
    callGraph[filePath].add({ variableFunction, line: getLineNumber(fileContent, match.index) });
  }
}

// Function to get the line number of a match in a string
function getLineNumber(str, index) {
  return str.substr(0, index).split('\n').length;
}

// Specify your project-specific paths
const baseFolderPath = '../foodmine-course/frontend/src';
const exampleSpecPath = '../testcases/example_spec.js'; // Path to the specific JavaScript file

// Initialize call graph object
const callGraph = {};

// Analyze TypeScript and JavaScript files in the base folder path
const files = getFilesRecursively(baseFolderPath);
files.forEach(file => analyzeFile(file, callGraph));

// Analyze the specific Protractor test script
analyzeFile(exampleSpecPath, callGraph);

// Print the call graph
console.log('Call graph:', callGraph);

// Function to find dependencies between lines
function findDependencies(callGraph, exampleFilePath) {
    const dependencies = {};

    for (const filePath in callGraph) {
        if (filePath !== exampleFilePath) {
            const methods = callGraph[filePath];
            methods.forEach(({ method, line }) => {
                if (!dependencies[line]) {
                    dependencies[line] = [];
                }
                dependencies[line].push({ method, file: filePath });
            });
        }
    }

    return dependencies;
}

const dependencies = findDependencies(callGraph, exampleSpecPath);

// Print dependencies
console.log('Line dependencies:');
for (const line in dependencies) {
    const methods = dependencies[line];
    methods.forEach(({ method, file }) => {
        const exampleSpecLineNumber = getExampleSpecLineNumber(exampleSpecPath, method);
        console.log(`Line ${line} from ${file} is dependent on method '${method}' from ${path.basename(exampleSpecPath)} which is on line ${exampleSpecLineNumber}`);
    });
}

// Function to get the line number of a method in exampleSpecPath
function getExampleSpecLineNumber(exampleFilePath, method) {
    const fileContent = fs.readFileSync(exampleFilePath, 'utf8');
    const methodRegex = new RegExp(`\\b${method}\\b`, 'g');
    let match;
    while ((match = methodRegex.exec(fileContent)) !== null) {
        return getLineNumber(fileContent, match.index);
    }
    return -1; // Method not found
}
