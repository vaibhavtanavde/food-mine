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

  const functionCalls = [];

  traverse(jsAst, {
    CallExpression(node) {
      const functionName = getFunctionName(node.callee);
      const location = node.loc.start;

      // Extracting information about function calls and their parameters
      const parameters = node.arguments.map(arg => extractParameterValue(arg));

      const functionCallInfo = { functionName, parameters, location };
      functionCalls.push(functionCallInfo);

      // Log the information to the browser console
      logToConsole(functionCallInfo);
    },
  });

  result.js.push({ filePath, functionCalls });
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
  formattedContent += '.tooltip .tooltiptext { visibility: hidden; width: auto; background-color: #555; color: #fff; text-align: left; border-radius: 6px; padding: 5px; position: absolute; z-index: 1; opacity: 0; transition: opacity 0.3s; white-space: pre-line; }';
  formattedContent += '.tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }';
  formattedContent += '</style>';
  formattedContent += '</head><body>';

  const exampleSpecContent = fs.readFileSync(exampleSpecPath, 'utf8');

  // Display TypeScript classes
  result.ts.forEach(({ filePath, classes }) => {
    const fileContent = fs.readFileSync(filePath, 'utf8').split('\n');
    formattedContent += `<div class="file-container"><h2>${filePath}</h2>\n`;
    formattedContent += `<pre><code>`;
    fileContent.forEach((line, index) => {
      formattedContent += `<div class="tooltip" onmousemove="moveTooltip(event)"><span>${line}</span><span class="tooltiptext">${exampleSpecContent}</span></div>\n`;
    });
    formattedContent += `</code></pre>`;
    formattedContent += `<h3>Classes:</h3><ul>`;
    classes.forEach(className => {
      formattedContent += `<li>${className}</li>`;
    });
    formattedContent += `</ul></div><hr>`;
  });

  // JavaScript to move tooltip
  formattedContent += `<script>
  function moveTooltip(event) {
    const tooltip = event.target.querySelector('.tooltiptext');
    tooltip.style.left = (event.pageX + 30) + 'px'; // Adjust the offset as needed
    tooltip.style.top = (event.pageY - 30) + 'px'; // Adjust the offset as needed
  }
  </script>`;

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
