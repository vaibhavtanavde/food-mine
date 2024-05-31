const express = require('express');
const { digraph } = require('graphviz');
const opn = require('opn');
const axios = require('axios');
const path = require('path');

process.env.OUTPUT_DIR = __dirname;

const { analyzeSourceTestRelationship } = require('swt_visualization_tool'); 

