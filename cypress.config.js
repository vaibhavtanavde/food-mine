const { defineConfig } = require("cypress");
// Load .env file from the parent directory
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    specPattern: [
      'foodmine-course/Cypress/testsCypress/Login.cy.js',
      'foodmine-course/Cypress/testsCypress/Register.cy.js',
      'foodmine-course/Cypress/testsCypress/Search.cy.js',
      'foodmine-course/Cypress/testsCypress/Food.cy.js'

    ],
    env: {
      testEmail: process.env.TEST_EMAIL
    },
    supportFile: false,
    setupNodeEvents(on, config) {
      // You can add plugins or logging here
      return config;
    },
  },
});