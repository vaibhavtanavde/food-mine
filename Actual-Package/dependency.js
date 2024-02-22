const fs = require('fs');
const path = require('path');
const esprima = require('esprima');

// Function to extract function calls and variable references from JavaScript code
function extractFunctionCallsAndVariableReferences(code) {
    const functionCalls = [];
    const variableReferences = [];

    const ast = esprima.parseScript(code, { loc: true });

    function traverse(node) {
        if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
            if (node.callee.name !== 'console') {
                functionCalls.push({ name: node.callee.name, loc: node.loc.start.line });
            }
        } else if (node.type === 'Identifier') {
            variableReferences.push({ name: node.name, loc: node.loc.start.line });
        } else if (node.type === 'FunctionDeclaration') {
            functionCalls.push({ name: node.id.name, loc: node.loc.start.line });
        }

        for (const key in node) {
            if (node.hasOwnProperty(key) && typeof node[key] === 'object' && node[key] !== null) {
                traverse(node[key]);
            }
        }
    }

    traverse(ast);

    return { functionCalls, variableReferences };
}

// Function to read a JavaScript file and extract function calls and variable references
function analyzeFile(filePath) {
    const code = fs.readFileSync(filePath, 'utf-8');
    return extractFunctionCallsAndVariableReferences(code);
}

// Function to check line-level dependencies between two files
function checkLineLevelDependencies(file1Data, file2Data, file1Path, file2Path) {
    const dependencies = [];

    for (const call1 of file1Data.functionCalls) {
        for (const call2 of file2Data.functionCalls) {
            if (call1.name === call2.name) {
                dependencies.push(`Function call: Line ${call2.loc} from ${path.basename(file2Path)} is dependent on Line ${call1.loc} from ${path.basename(file1Path)}`);
            }
        }
    }

    for (const var1 of file1Data.variableReferences) {
        for (const var2 of file2Data.variableReferences) {
            if (var1.name === var2.name && var1.name !== 'console' && var1.name !== 'log') {
                dependencies.push(`Variable reference: Line ${var2.loc} from ${path.basename(file2Path)} is dependent on Line ${var1.loc} from ${path.basename(file1Path)}`);
            }
        }
    }

    return dependencies;
}

// Generate dependency analysis report
function generateReport(file1Path, file2Path, dependencies) {
    const report = `Dependency Analysis Report\n--------------------------------------------------------\nJavaScript File 1: ${path.basename(file1Path)}\nJavaScript File 2: ${path.basename(file2Path)}\n\nDependencies Found:\n--------------------------------------------------------\n${dependencies.join('\n')}\n--------------------------------------------------------\n`;

    // Print report to console
    console.log(report);

    // Write report to file
    const outputPath = path.join(__dirname, 'dependency_report.txt');
    fs.writeFileSync(outputPath, report, 'utf-8');
    console.log(`Dependency analysis report saved to ${outputPath}`);
}

// Paths to the JavaScript files
const exampleSpecPath = path.join(__dirname, '..', 'testcases', 'example.spec.js');
const exampleFilePath = path.join(__dirname, '..', 'Dummy', 'frontend', 'src', 'example.js');

// Analyze example.js and example.spec.js
const exampleData = analyzeFile(exampleFilePath);
const exampleSpecData = analyzeFile(exampleSpecPath);

// Check for dependencies between the two files based on function calls or variable references
const dependencies = checkLineLevelDependencies(exampleData, exampleSpecData, exampleFilePath, exampleSpecPath);

// Output dependencies
if (dependencies.length > 0) {
    // Generate and print dependency analysis report
    generateReport(exampleFilePath, exampleSpecPath, dependencies);
} else {
    console.log(`${path.basename(exampleSpecPath)} does not depend on ${path.basename(exampleFilePath)}`);
}
