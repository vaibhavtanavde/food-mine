const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Function to get all TypeScript files recursively in a directory
function getTsFilesRecursively(folder) {
  const files = [];
  function traverse(currentPath) {
    fs.readdirSync(currentPath).forEach(item => {
      const itemPath = path.join(currentPath, item);
      if (fs.statSync(itemPath).isDirectory()) {
        traverse(itemPath);
      } else if (itemPath.endsWith('.ts')) {
        files.push(itemPath);
      }
    });
  }
  traverse(folder);
  return files;
}

// Analyze TypeScript files for variable declarations and assignments
// Analyze TypeScript files for variable declarations and assignments
function analyzeTsFile(filePath, callGraph) {
  const fileName = path.basename(filePath); // Extracting file name from the file path
  callGraph[fileName] = []; // Initialize an array for the file
  //console.log('Analyzing TypeScript file:', fileName);
  const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest
  );
  function visit(node) {
    if (ts.isVariableDeclaration(node)) {
      // Check if the variable is being exported
      if (node.modifiers && node.modifiers.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword)) {
        const variableName = node.name.getText();
        // Record the exported variable in the call graph with file name
        callGraph[fileName].push(variableName);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
}


function analyzeJsFile(filePath, callGraph) {
  const fileName = path.basename(filePath); // Extracting file name from the file path
  callGraph[fileName] = []; // Initialize an array for the file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const methodCallRegex = /(\w+)\.(\w+)\(/g;
  let match;
  while ((match = methodCallRegex.exec(fileContent)) !== null) {
    console.log('Match found in file:', fileName, 'Caller:', match[1], 'Method:', match[2]);
    const caller = match[1];
    const methodName = match[2];
    // Exclude specific identifiers
    if (caller !== 'this' && caller !== 'window' && caller !== 'browser' && caller !== 'by' &&
        methodName !== 'log' && methodName !== 'sleep' && methodName !== 'css') {
      // Record the method call in the call graph with file name
      callGraph[fileName].push(methodName);
    }
  }
}


// Specify your project-specific paths
const baseFolderPath = '..//foodmine-course//frontend//src';
const exampleSpecPath = '..//testcases//example_spec.js'; // Path to the specific JavaScript file

// Initialize call graph object
const callGraph = {};

// Analyze TypeScript files in the base folder path
const tsFiles = getTsFilesRecursively(baseFolderPath);
tsFiles.forEach(tsFile => analyzeTsFile(tsFile, callGraph));

// Analyze JavaScript file
analyzeJsFile(exampleSpecPath, callGraph);

// Print the call graph to the console
//console.log('Call graph:', callGraph);
