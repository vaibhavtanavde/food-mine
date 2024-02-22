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

// Analyze JavaScript files for method calls
function analyzeJsFile(filePath, callGraph) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const methodCallRegex = /(\w+)\.(\w+)\(/g;
    let match;
    while ((match = methodCallRegex.exec(fileContent)) !== null) {
      const caller = match[1];
      const methodName = match[2];
      if (caller !== 'this' && caller !== 'window') {
        // Record the method call in the call graph
        callGraph[caller] = callGraph[caller] || [];
        callGraph[caller].push(methodName);
      }
    }
}


// Analyze TypeScript files for variable declarations and assignments
function analyzeTsFile(filePath, callGraph) {
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
         // console.log('Found exported variable:', variableName, 'in file:', filePath);
          
          // Record the exported variable in the call graph
          callGraph[filePath] = callGraph[filePath] || [];
          callGraph[filePath].push(variableName);
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
}

// Specify your project-specific paths
const baseFolderPath = '..//foodmine-course//frontend//src';
const exampleSpecPath = '..//testcases//example_spec.js'; // Path to the specific JavaScript file

// Initialize call graph object
const callGraph = {};

// Analyze TypeScript files in the base folder path
const tsFiles = getTsFilesRecursively(baseFolderPath);
//console.log('Found TypeScript files:', tsFiles);

tsFiles.forEach(tsFile => analyzeTsFile(tsFile, callGraph));

// Analyze JavaScript file
analyzeJsFile(exampleSpecPath, callGraph);

// Print the call graph to the console
console.log('Call graph:', callGraph);
