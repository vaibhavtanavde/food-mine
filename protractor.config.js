require('dotenv').config();

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the WebDriver instance
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--window-size=1920,1080']
    }
  },

  params: {
    testEmail: process.env.TEST_EMAIL,
    testName: 'John Doe',
    testAddress: '123 Street, City'
  },

  // Framework to use
  framework: 'jasmine',

  // Test specifications
  specs: [
    './foodmine-course/Protractor/testsProtractor/login-page.spec.js',
    './foodmine-course/Protractor/testsProtractor/register-page.spec.js',
    './foodmine-course/Protractor/testsProtractor/search-page.spec.js',
    './foodmine-course/Protractor/testsProtractor/food-page.spec.js',
    './foodmine-course/Protractor/testsProtractor/cart-page.spec.js',
    './foodmine-course/Protractor/testsProtractor/checkout-page.spec.js'
  ],

  // Jasmine options
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },

  // Reporter
  onPrepare: function() {
    var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      savePath: 'test-reports',
      screenshotsFolder: 'images',
      takeScreenshots: true,
      takeScreenshotsOnlyOnFailures: true,
      fixedScreenshotName: true,
      fileName: 'protractor-test-report'
    }));
  }
};
