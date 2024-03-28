// Import required modules
const fs = require('fs');
const path = require('path');

// Function to get all TypeScript and JavaScript files recursively in a directory
function getFilesRecursively(folder: string): string[] {
    const files: string[] = [];
    function traverse(currentPath: string) {
        fs.readdirSync(currentPath).forEach(item => {
            const itemPath = path.join(currentPath, item);
            if (fs.statSync(itemPath).isDirectory()) {
                traverse(itemPath);
            } else if (itemPath.endsWith('.ts') || itemPath.endsWith('.js')) {
                files.push(itemPath);
            }
        });
    }
    traverse(folder);
    return files;
}

// Specify your project-specific paths
const baseFolderPath: string = '../foodmine-course/frontend/src';
const exampleSpecPath: string = '../testcases/example_spec.js'; // Path to the specific JavaScript file

// Analyze the specific Protractor test script to extract test case descriptions
const testCases: Map<string, string[]> = new Map();
const testFileContent: string = fs.readFileSync(exampleSpecPath, 'utf8');
const testCaseRegex: RegExp = /describe\(['"](.+?)['"]/g; // Regex to match describe blocks
let match: RegExpExecArray | null;
while ((match = testCaseRegex.exec(testFileContent)) !== null) {
    const testCaseName: string = cleanTestCaseName(match[1]);
    testCases.set(testCaseName, []);
}

// Get all TypeScript files in the base folder path
const tsFiles: string[] = getFilesRecursively(baseFolderPath).filter(file => file.endsWith('.ts'));

// Function to analyze source code files and link them to test cases based on common words
function linkSourceFilesToTestCases(): void {
    tsFiles.forEach((tsFile: string) => {
        const fileName: string = path.basename(tsFile, path.extname(tsFile));
        const fileContent: string = fs.readFileSync(tsFile, 'utf8');
        testCases.forEach((testCase: string[], testCaseName: string) => {
            if (fileContent.includes(testCaseName.toLowerCase())) {
                testCases.get(testCaseName)?.push(fileName);
            }
        });
    });
}

// Execute the linking process
linkSourceFilesToTestCases();

// Print the linked test cases and source files
console.log('Linked source code and test cases files:');
tsFiles.forEach(sourceFile => {
    const fileName: string = path.basename(sourceFile);
    const fileContent: string = fs.readFileSync(sourceFile, 'utf8');
    testCases.forEach((_, testCase: string) => {
        if (fileContent.includes(testCase.toLowerCase())) {
            console.log(`${fileName} is linked to ${testCase}`);
        }
    });
});

// Function to clean and extract test case names
function cleanTestCaseName(testCase: string): string {
    return testCase.replace(/['"]/g, '').trim(); // Remove quotes and trim whitespace
}
