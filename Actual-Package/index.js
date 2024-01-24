// index.js
const esprima = require('esprima');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const tsMorph = require('ts-morph');

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

function analyzeTsFile(filePath, result) {
  const project = new tsMorph.Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  const classes = sourceFile.getClasses();
  const functions = sourceFile.getFunctions();

  result.ts.push({
    filePath,
    classes: classes.map(c => c.getName()),
    functions: functions.map(f => f.getName()),
  });
}

// ...

function analyzeJsFile(filePath, result) {
  const jsCode = fs.readFileSync(filePath, 'utf-8');
  const jsAst = esprima.parseScript(jsCode, { loc: true });

  const classes = [];
  const functions = [];

  traverse(jsAst, {
    ClassDeclaration(node) {
      classes.push(node.id.name);
    },
    FunctionDeclaration(node) {
      functions.push(node.id.name);
    },
  });

  result.js.push({ filePath, classes, functions });
}

// Helper function to log information to the browser console
function logToConsole(info) {
  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    console.log('Function Call:', info.functionName);
    console.log('Parameters:', info.parameters);
    console.log('Location:', info.location);
    console.log('------------------------');
  }
}

// Helper function to get the name of a function from its AST node
function getFunctionName(callee) {
  if (callee.type === 'Identifier') {
    return callee.name;
  } else if (callee.type === 'MemberExpression') {
    return getFunctionName(callee.property);
  } else {
    return null; // Handle other cases as needed
  }
}

// Helper function to extract parameter values from AST nodes
function extractParameterValue(arg) {
  if (arg.type === 'Literal') {
    return arg.value;
  } else if (arg.type === 'Identifier') {
    return arg.name;
  } else {
    return null; // Handle other cases as needed
  }
}

function analyzeHtmlFile(filePath, result) {
  const htmlCode = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(htmlCode);

  const elements = $('body').find('div');
  result.html.push({ filePath, elementCount: elements.length });
}

function formatContent(result, baseFolderPath, exampleSpecPath) {
  let formattedContent = '<html><head>';
  formattedContent += '<style>';
  formattedContent += '.file-container { margin-bottom: 20px; }';
  formattedContent += '.tooltip { position: relative; display: inline-block; }';
  formattedContent += '.tooltip .tooltiptext { visibility: hidden; width: auto; background-color: #555; color: #fff; text-align: left; border-radius: 6px; padding: 5px; position: absolute; z-index: 1; top: 0; left: 100%; margin-left: 10px; opacity: 0; transition: opacity 0.3s; }';
  formattedContent += '.tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }';
  formattedContent += '</style>';
  formattedContent += '</head><body>';

  const exampleSpecContent = fs.readFileSync(exampleSpecPath, 'utf8');

  // Display TypeScript classes and functions
  result.ts.forEach(({ filePath, classes, functions }) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    formattedContent += `<div class="file-container"><h2>${filePath}</h2>\n`;
    formattedContent += `<div class="tooltip"><pre class="tooltiptext">${exampleSpecContent}</pre>\n<pre>${fileContent}</pre></div><br>`;

    if (classes.length > 0) {
      formattedContent += `<h3>Classes:</h3><ul>`;
      classes.forEach(className => {
        formattedContent += `<li>${className}</li>`;
      });
      formattedContent += `</ul>`;
    }

    if (functions.length > 0) {
      formattedContent += `<h3>Functions:</h3><ul>`;
      functions.forEach(func => {
        formattedContent += `<li>${func}</li>`;
      });
      formattedContent += `</ul>`;
    }

    formattedContent += `</div><hr>`;
  });

  // Display JavaScript classes and functions
  result.js.forEach(({ filePath, classes, functions }) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    formattedContent += `<div class="file-container"><h2>${filePath}</h2>\n`;
    formattedContent += `<div class="tooltip"><pre class="tooltiptext">${exampleSpecContent}</pre>\n<pre>${fileContent}</pre></div><br>`;

    if (classes.length > 0) {
      formattedContent += `<h3>Classes:</h3><ul>`;
      classes.forEach(className => {
        formattedContent += `<li>${className}</li>`;
      });
      formattedContent += `</ul>`;
    }

    if (functions.length > 0) {
      formattedContent += `<h3>Functions:</h3><ul>`;
      functions.forEach(func => {
        formattedContent += `<li>${func}</li>`;
      });
      formattedContent += `</ul>`;
    }

    formattedContent += `</div><hr>`;
  });

  // Display HTML elements
  result.html.forEach(({ filePath, elementCount }) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    formattedContent += `<div class="file-container"><h2>${filePath}</h2>\n`;
    formattedContent += `<div class="tooltip"><pre class="tooltiptext">${exampleSpecContent}</pre>\n<pre>${fileContent}</pre></div><br>`;
    formattedContent += `<h3>Element Count:</h3><p>${elementCount}</p></div><hr>`;
  });

  formattedContent += '</body></html>';
  return formattedContent;
}


function startServer(baseFolderPath, exampleSpecPath) {
  const app = express();
  const port = 3000;

  app.use('/html', express.static(path.join(baseFolderPath, '**/*.html')));
  app.use('/ts', express.static(path.join(baseFolderPath, '**/*.ts')));
  app.use('/js', express.static(path.join(baseFolderPath, '**/*.js')));

  app.get('/', (req, res) => {
    const result = { ts: [], js: [], html: [] };

    const tsFiles = getFilesRecursively(baseFolderPath, '.ts');
    tsFiles.forEach(tsFile => analyzeTsFile(tsFile, result));

    const jsFiles = getFilesRecursively(baseFolderPath, '.js');
    jsFiles.forEach(jsFile => analyzeJsFile(jsFile, result));

    const htmlFiles = getFilesRecursively(baseFolderPath, '.html');
    htmlFiles.forEach(htmlFile => analyzeHtmlFile(htmlFile, result));

    res.send(formatContent(result, baseFolderPath, exampleSpecPath));
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

module.exports = {
  startServer,
};
