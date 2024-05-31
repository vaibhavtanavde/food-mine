const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const sourceDir = 'C:\\Users\\abc\\Desktop\\Germany\\sUBJECTS\\Thesis\\2301\\food-mine\\foodmine-course\\frontend\\src\\app\\components';
const testDir = 'C:\\Users\\abc\\Desktop\\Germany\\sUBJECTS\\Thesis\\2301\\food-mine\\foodmine-course\\tests1';

function cleanText(text) {
    return text.replace(/\s+/g, ' ').trim().replace(/{{|}}|\(|\)/g, '').trim();
}

function extractClickableElements(htmlContent) {
    const $ = cheerio.load(htmlContent);
    const clickableElements = [];

    $('a, button, select, default-button').each((index, element) => {
        const tagName = element.tagName.toLowerCase();
        let elementText = '';

        if (tagName === 'a') {
            elementText = cleanText($(element).text());
            clickableElements.push(elementText || 'N/A');
        } else if (tagName === 'button') {
            elementText = cleanText($(element).text());
            clickableElements.push(elementText || 'N/A');
        } else if (tagName === 'select') {
            const valueBinding = cleanText($(element).attr('value') || $(element).attr('[value]') || $(element).attr('ng-reflect-value') || '');
            const textBinding = cleanText($(element).attr('#') || $(element).attr('id') || 'N/A');
            const contextText = valueBinding || textBinding;
            clickableElements.push(contextText);
        } else if (tagName === 'default-button') {
            elementText = cleanText($(element).attr('text') || 'N/A');
            clickableElements.push(elementText);
        }
    });

    return clickableElements;
}

function scanDirectory(dir, ext) {
    const results = {};

    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            Object.assign(results, scanDirectory(fullPath, ext));
        } else if (stat.isFile() && path.extname(fullPath) === ext) {
            const content = fs.readFileSync(fullPath, 'utf8');
            results[fullPath] = content;
        }
    });

    return results;
}

function toCamelCase(str) {
    return str
        .replace(/[-_\s.]+(.)?/g, (_, chr) => chr ? chr.toUpperCase() : '')
        .replace(/^(.)/, (_, chr) => chr.toLowerCase());
}

function generateVariableNames(element) {
    const camelCaseName = toCamelCase(element);
    return [
        camelCaseName,
        camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)
    ];
}

function findElementUsage(element, testFiles) {
    const usage = [];
    const variableNames = generateVariableNames(element);

    for (const [filePath, content] of Object.entries(testFiles)) {
        const lines = content.split('\n');
        lines.forEach((line, index) => {
            variableNames.forEach(variableName => {
                if (line.includes(variableName)) {
                    usage.push({ file: path.basename(filePath), line: index + 1 });
                }
            });
        });
    }

    return usage;
}

// Step 1: Extract clickable elements from HTML components
const htmlFiles = scanDirectory(sourceDir, '.html');
const clickableElements = {};
for (const [file, content] of Object.entries(htmlFiles)) {
    const elements = extractClickableElements(content);
    if (elements.length > 0) {
        clickableElements[file] = elements;
    }
}

// Step 2: Scan test files
const testFiles = scanDirectory(testDir, '.ts');

// Step 3: Find element usage in test files
for (const [htmlFile, elements] of Object.entries(clickableElements)) {
    console.log(`${htmlFile} has UI elements:`);
    elements.forEach(element => {
        const usage = findElementUsage(element, testFiles);
        if (usage.length > 0) {
            usage.forEach(({ file, line }) => {
                console.log(`  - ${element} is used in ${file} on Line ${line}`);
            });
        } else {
            console.log(`  - ${element} is not used in any test files.`);
        }
    });
}
