const esprima = require('esprima');
const fs = require('fs');
const path = require('path');

// Function to extract function calls and variable references from JavaScript files
function extractFunctionCallsAndVariableReferences(code) {
    const functionCalls = [];
    const variableReferences = [];

    const ast = esprima.parseScript(code, { loc: true });

    // Traverse the AST to extract function calls and variable references
    function traverse(node) {
        if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
            if (node.callee.name !== 'console') { // Exclude console.log
                functionCalls.push({
                    name: node.callee.name,
                    loc: node.loc.start.line
                });
            } else {
                console.log('Excluded console.log at line:', node.loc.start.line);
            }
        }
        else if (node.type === 'Identifier') {
            variableReferences.push({
                name: node.name,
                loc: node.loc.start.line
            });
        } else if (node.type === 'FunctionDeclaration') {
            functionCalls.push({
                name: node.id.name,
                loc: node.loc.start.line
            });
        }

        // Recursively traverse child nodes if they exist
        for (const key in node) {
            if (node.hasOwnProperty(key) && typeof node[key] === 'object' && node[key] !== null) {
                traverse(node[key]);
            }
        }
    }

    traverse(ast);

    console.log('Function Calls:', functionCalls);
    console.log('Variable References:', variableReferences);

    return { functionCalls, variableReferences };
}


// Function to read a JavaScript file and extract function calls and variable references
function analyzeFile(filePath) {
    const code = fs.readFileSync(filePath, 'utf-8');
    return extractFunctionCallsAndVariableReferences(code);
}

// Function to check line-level dependencies between two files
function checkLineLevelDependencies(file1Data, file2Data) {
    const dependencies = [];

    for (const call1 of file1Data.functionCalls) {
        for (const call2 of file2Data.functionCalls) {
            if (call1.name === call2.name) {
                dependencies.push(`Line ${call2.loc} from ${path.basename(exampleSpecPath)} is dependent on Line ${call1.loc} from ${path.basename(exampleFilePath)}`);
            }
        }
    }

    for (const var1 of file1Data.variableReferences) {
        for (const var2 of file2Data.variableReferences) {
            if (var1.name === var2.name && var1.name !== 'console' && var1.name !== 'log') {
                dependencies.push(`Line ${var2.loc} from ${path.basename(exampleSpecPath)} is dependent on Line ${var1.loc} from ${path.basename(exampleFilePath)}`);
            }
        }
    }

    return dependencies;
}


// Paths to the JavaScript files
const exampleSpecPath = path.join(__dirname, '..', 'testcases', 'example.spec.js');
const exampleFilePath = path.join(__dirname, '..', 'Dummy', 'frontend', 'src', 'example.js');

// Analyze example.js
const exampleData = analyzeFile(exampleFilePath);

// Analyze example.spec.js
const exampleSpecData = analyzeFile(exampleSpecPath);

// Check for dependencies between the two files based on function calls or variable references
const dependencies = checkLineLevelDependencies(exampleData, exampleSpecData);

// Output dependencies
if (dependencies.length > 0) {
    dependencies.forEach(dependency => {
        console.log(dependency);
    });
} else {
    console.log(`${path.basename(exampleSpecPath)} does not depend on ${path.basename(exampleFilePath)}`);
}









