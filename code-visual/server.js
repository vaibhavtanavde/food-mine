const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const baseFolderPath = path.join(__dirname, '..', 'foodmine-course', 'frontend', 'src');

// Serve HTML and TypeScript files separately
app.use('/html', express.static(path.join(baseFolderPath, '**/*.html')));
app.use('/ts', express.static(path.join(baseFolderPath, '**/*.ts')));

// Route to display concatenated content of specific file types
app.get('/', (req, res) => {
  // Read content of each file with specified extensions
  const fileContents = [];

  // Read HTML files
  const htmlFiles = getFilesRecursively(baseFolderPath, '.html');
  htmlFiles.forEach(htmlFile => {
    const content = fs.readFileSync(htmlFile, 'utf8');
    fileContents.push({ filename: path.relative(baseFolderPath, htmlFile), content });
  });

  // Read TypeScript files
  const tsFiles = getFilesRecursively(baseFolderPath, '.ts');
  tsFiles.forEach(tsFile => {
    const content = fs.readFileSync(tsFile, 'utf8');
    fileContents.push({ filename: path.relative(baseFolderPath, tsFile), content });
  });

  // Send the content as a formatted response
  res.send(formatContent(fileContents));
});

// Function to get all files with a specific extension recursively
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

// Function to format content for display
function formatContent(fileContents) {
  let formattedContent = '<html><head>';
  // Add CSS for tooltips
  formattedContent += '<style>';
  formattedContent += '.file-container { margin-bottom: 20px; }'; // Adjust margin as needed
  formattedContent += '.tooltip { position: relative; display: inline-block; }';
  formattedContent += '.tooltip .tooltiptext { visibility: hidden; width: auto; background-color: #555; color: #fff; text-align: left; border-radius: 6px; padding: 5px; position: absolute; z-index: 1; top: 0; left: 100%; margin-left: 10px; opacity: 0; transition: opacity 0.3s; }';
  formattedContent += '.tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }';
  formattedContent += '</style>';
  formattedContent += '</head><body>';

  // Read the content of example_spec.js
  const exampleSpecPath = path.join(__dirname, '..', 'testcases', 'example_spec.js');
  const exampleSpecContent = fs.readFileSync(exampleSpecPath, 'utf8');

  fileContents.forEach(({ filename, content }) => {
    // Split content into lines
    const lines = content.split('\n');
    
    // Add tooltip for each line of code within a file container
    formattedContent += `<div class="file-container"><h2>${filename}</h2>\n`;
    lines.forEach((line, index) => {
      formattedContent += `<div class="tooltip"><pre class="tooltiptext">${exampleSpecContent}</pre>\n<pre>${line}</pre></div><br>`;
    });
    formattedContent += '</div><hr>';
  });

  formattedContent += '</body></html>';
  return formattedContent;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
