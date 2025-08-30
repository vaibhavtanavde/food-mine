const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: [
      'foodmine-course/Cypress/testsCypress/Login.cy.js',
      'foodmine-course/Cypress/testsCypress/Register.cy.js',
      'foodmine-course/Cypress/testsCypress/Search.cy.js',
      'foodmine-course/Cypress/testsCypress/Food.cy.js',
      'foodmine-course/Cypress/testsCypress/Cart.cy.js',
      'foodmine-course/Cypress/testsCypress/Checkout.cy.js'
    ],
    supportFile: false,
    setupNodeEvents(on, config) {
      // No fs or plugins needed
      return config;
    },
  },
});
