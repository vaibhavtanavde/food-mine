//analyze.js
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const tsMorph = require('ts-morph');
const esprima = require('esprima');

// Function to analyze the content of a TypeScript file using ts-morph
function analyzeTsFile(filePath) {
  const project = new tsMorph.Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  // Example: Extract information from the TypeScript file
  const classes = sourceFile.getClasses();
  console.log(`Classes in ${filePath}:`, classes.map(c => c.getName()));

  // Add more analysis as needed

  return classes;
}

// Function to analyze the content of a JavaScript file using esprima
function analyzeJsFile(filePath) {
  const jsCode = fs.readFileSync(filePath, 'utf-8');
  const jsAst = esprima.parseScript(jsCode, { loc: true });

  // Example: Extract information from the JavaScript file
  const functionNames = [];
  traverse(jsAst, {
    FunctionDeclaration(node) {
      functionNames.push(node.id.name);
    },
    // Add more rules for other types of functions (e.g., FunctionExpression)
  });

  console.log(`Function Names in ${filePath}:`, functionNames);

  // Add more analysis as needed

  return functionNames;
}

// Function to analyze the content of an HTML file using Cheerio
function analyzeHtmlFile(filePath) {
  const htmlCode = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(htmlCode);

  // Example: Extract information from the HTML file
  const elements = $('body').find('div'); // Adjust this based on your HTML structure

  console.log(`Elements in ${filePath}:`, elements.length);

  // Add more analysis as needed

  return elements;
}

// Example: Analyze all TypeScript, JavaScript, and HTML files in baseFolderPath
const baseFolderPath = '..//foodmine-course//frontend//src';
const tsFiles = getFilesRecursively(baseFolderPath, '.ts');
const jsFiles = getFilesRecursively(baseFolderPath, '.js');
const htmlFiles = getFilesRecursively(baseFolderPath, '.html');

tsFiles.forEach(tsFile => {
  analyzeTsFile(tsFile);
});

jsFiles.forEach(jsFile => {
  analyzeJsFile(jsFile);
});

htmlFiles.forEach(htmlFile => {
  analyzeHtmlFile(htmlFile);
});

// Example specification file path (adjust this to your actual file)
const exampleSpecPath = '..//testcases//example_spec.js';
// Use the defined exampleSpecPath in your code
analyzeJsFile(exampleSpecPath);

// Function to get all files recursively in a directory with a specific extension
function getFilesRecursively(folder, extension) {
  const files = [];

  function traverse(currentPath) {
    fs.readdirSync(currentPath).forEach(item => {
      const itemPath = path.join(currentPath, item);
      if (fs.statSync(itemPath).isDirectory()) {
        traverse(itemPath);
      } else if (itemPath.endsWith(extension)) {
        files.push(itemPath);
      }
    });
  }

  traverse(folder);
  return files;
}

// Example: Traverse the AST recursively
function traverse(node, visitor) {
  function visit(node, parent) {
    if (!node) {
      return;
    }

    if (visitor[node.type]) {
      visitor[node.type](node, parent);
    }

    for (const key in node) {
      if (node.hasOwnProperty(key)) {
        if (typeof node[key] === 'object' && node[key] !== null) {
          if (Array.isArray(node[key])) {
            node[key].forEach(child => visit(child, node));
          } else {
            visit(node[key], node);
          }
        }
      }
    }
  }

  visit(node, null);
}
