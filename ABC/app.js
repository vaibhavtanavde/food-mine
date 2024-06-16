//app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { digraph } = require('graphviz');
const opn = require('opn');
const axios = require('axios');
const cheerio = require('cheerio');

process.env.OUTPUT_DIR = __dirname;

const { scanDirectory } = require('project');
const { cleanText } = require('project');
const { extractClickableElements } = require('project');
const { extractClickableElementsFromFiles } = require('project');
const { toCamelCase } = require('project');
const { generateVariableNames } = require('project');
const { findElementUsage } = require('project');