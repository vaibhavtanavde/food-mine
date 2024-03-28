exports.config = {
    // Framework to use
    framework: 'jasmine',

    // Spec files to run
    specs: ['tests/*.spec.js'],

    // Options to be passed to Jasmine
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000 // Increase timeout if needed
    },

    // Base URL for application under test
    baseUrl: 'http://localhost:8080', // Adjust as needed

    // Selenium server address
    seleniumAddress: 'http://localhost:4444/wd/hub', // Default address

    // Capabilities to be passed to the webdriver instance
    capabilities: {
        browserName: 'chrome', // Use Chrome browser
        chromeOptions: {
            args: ['--disable-gpu', '--no-sandbox'] // Required for running Chrome in Docker containers
        }
    },

    // Before launching the browser, perform configuration tasks
    beforeLaunch: function () {
        // Start WebDriver Manager
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.json')
        });
        require('tsconfig-paths').register({
            project: require('path').join(__dirname, './tsconfig.json')
        });
        return require('webdriver-manager').start();
    },

    // Close the WebDriver instance
    afterLaunch: function () {
        return require('webdriver-manager').shutdown();
    }
};
