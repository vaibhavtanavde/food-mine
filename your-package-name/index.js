// index.js
const express = require('express');
const fs = require('fs');
const path = require('path');

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

function formatContent(fileContents, baseFolderPath, exampleSpecPath) {
  let formattedContent = '<html><head>';
  formattedContent += '<style>';
  formattedContent += '.file-container { margin-bottom: 20px; }';
  formattedContent += '.tooltip { position: relative; display: inline-block; }';
  formattedContent += '.tooltip .tooltiptext { visibility: hidden; width: auto; background-color: #555; color: #fff; text-align: left; border-radius: 6px; padding: 5px; position: absolute; z-index: 1; top: 0; left: 100%; margin-left: 10px; opacity: 0; transition: opacity 0.3s; }';
  formattedContent += '.tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }';
  formattedContent += '</style>';
  formattedContent += '</head><body>';

  const exampleSpecContent = fs.readFileSync(exampleSpecPath, 'utf8');

  fileContents.forEach(({ filename, content }) => {
    const lines = content.split('\n');

    formattedContent += `<div class="file-container"><h2>${filename}</h2>\n`;
    lines.forEach((line, index) => {
      formattedContent += `<div class="tooltip"><pre class="tooltiptext">${exampleSpecContent}</pre>\n<pre>${line}</pre></div><br>`;
    });
    formattedContent += '</div><hr>';
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
    const fileContents = [];

    const htmlFiles = getFilesRecursively(baseFolderPath, '.html');
    htmlFiles.forEach(htmlFile => {
      const content = fs.readFileSync(htmlFile, 'utf8');
      fileContents.push({ filename: path.relative(baseFolderPath, htmlFile), content });
    });

    const tsFiles = getFilesRecursively(baseFolderPath, '.ts');
    tsFiles.forEach(tsFile => {
      const content = fs.readFileSync(tsFile, 'utf8');
      fileContents.push({ filename: path.relative(baseFolderPath, tsFile), content });
    });

    res.send(formatContent(fileContents, baseFolderPath, exampleSpecPath));
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

module.exports = {
  startServer,
};
