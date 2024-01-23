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
  result.ts.push({ filePath, classes: classes.map(c => c.getName()) });
}

function analyzeJsFile(filePath, result) {
  const jsCode = fs.readFileSync(filePath, 'utf-8');
  const jsAst = esprima.parseScript(jsCode, { loc: true });

  const functionNames = [];
  traverse(jsAst, {
    FunctionDeclaration(node) {
      functionNames.push(node.id.name);
    },
  });

  result.js.push({ filePath, functionNames });
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

  // Display TypeScript classes
  result.ts.forEach(({ filePath, classes }) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    formattedContent += `<div class="file-container"><h2>${filePath}</h2>\n`;
    formattedContent += `<div class="tooltip"><pre class="tooltiptext">${exampleSpecContent}</pre>\n<pre>${fileContent}</pre></div><br>`;
    formattedContent += `<h3>Classes:</h3><ul>`;
    classes.forEach(className => {
      formattedContent += `<li>${className}</li>`;
    });
    formattedContent += `</ul></div><hr>`;
  });

  // Display JavaScript functions
  result.js.forEach(({ filePath, functionNames }) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    formattedContent += `<div class="file-container"><h2>${filePath}</h2>\n`;
    formattedContent += `<div class="tooltip"><pre class="tooltiptext">${exampleSpecContent}</pre>\n<pre>${fileContent}</pre></div><br>`;
    formattedContent += `<h3>Functions:</h3><ul>`;
    functionNames.forEach(functionName => {
      formattedContent += `<li>${functionName}</li>`;
    });
    formattedContent += `</ul></div><hr>`;
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
