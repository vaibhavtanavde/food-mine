// conf.js
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: [
    '../foodmine-course/tests/login-page.spec.js',
    '../foodmine-course/tests/register-page.spec.js',
    '../foodmine-course/tests/search-page.spec.js',
    '../foodmine-course/tests/food-page.spec.js',
    '../foodmine-course/tests/cart-page.spec.js',
    '../foodmine-course/tests/checkout-page.spec.js'
  ],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },

  // Add Jasmine reporter for reporting test results
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
  },
};
