//code to exatct methods functiosn classname from source files

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Specify your project-specific paths
const baseFolderPath = '../foodmine-course/frontend/src';


// Function to extract all methods and class functions from TypeScript files
function extractMethodsAndFunctions(baseFolderPath) {
  const files = getFilesRecursively(baseFolderPath);
  const methodsAndFunctions = [];

  files.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.ESNext, true);

      ts.forEachChild(sourceFile, node => {
          if (ts.isClassDeclaration(node)) {
              const className = node.name ? node.name.getText() : 'AnonymousClass';
              const classFunctions = [];
              node.members.forEach(member => {
                  if (ts.isMethodDeclaration(member)) {
                      classFunctions.push(member.name.getText());
                  }
              });
              methodsAndFunctions.push({ className, functions: classFunctions });
          }
      });
  });

  return methodsAndFunctions;
}



// Function to get all TypeScript files recursively in a directory
function getFilesRecursively(folder) {
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

// Extract all methods and class functions information from the baseFolderPath
const methodsAndFunctions = extractMethodsAndFunctions(baseFolderPath);
console.log('Methods and class functions information from baseFolderPath:');
console.log(methodsAndFunctions);
