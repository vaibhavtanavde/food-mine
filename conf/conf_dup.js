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
      '../foodmine-course/tests1/login-page.spec.js',
      '../foodmine-course/tests1/register-page.spec.js',
      '../foodmine-course/tests1/search-page.spec.js',
      '../foodmine-course/tests1/home-page.spec.js', 
      '../foodmine-course/tests1/food-page.spec.js',
      '../foodmine-course/tests1/cart-page.spec.js',
      '../foodmine-course/tests1/checkout-page.spec.js'
    ],
  
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000
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
  
    // Add reporters for coverage
    onComplete: function() {
      var browserName, browserVersion;
      var capsPromise = browser.getCapabilities();
  
      capsPromise.then(function (caps) {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version');
        platform = caps.get('platform');
  
        var HTMLReport = require('protractor-html-reporter-2');
  
        testConfig = {
            reportTitle: 'Protractor Test Execution Report',
            outputPath: './',
            outputFilename: 'ProtractorTestReport',
            screenshotPath: './screenshots',
            testBrowser: browserName,
            browserVersion: browserVersion,
            modifiedSuiteName: false,
            screenshotsOnlyOnFailure: true,
            testPlatform: platform
        };
        new HTMLReport().from('test-reports/protractor-test-report.xml', testConfig);
      });
    }
  };
  