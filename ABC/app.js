//app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { digraph } = require('graphviz');
const opn = require('opn');
const axios = require('axios');
const cheerio = require('cheerio');

process.env.OUTPUT_DIR = __dirname;

const { scanDirectory } = require('traceability_visualization_tool');
const { extractClickableElements } = require('traceability_visualization_tool');
const { extractClickableElementsFromFiles } = require('traceability_visualization_tool');
const { findElementUsage } = require('traceability_visualization_tool');