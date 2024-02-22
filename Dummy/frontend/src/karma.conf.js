module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'C://Users//abc//Desktop//Germany//sUBJECTS//Thesis//2301//food-mine//Dummy//frontend//src//**//*.html', // HTML source files
            'C://Users//abc//Desktop//Germany//sUBJECTS//Thesis//2301//food-mine//Dummy//frontend//src//**//*.ts',   // TypeScript source files
            'C://Users//abc//Desktop//Germany//sUBJECTS//Thesis//2301//food-mine//Dummy//frontend//src//**//*.css',  // CSS source files
            'C://Users//abc//Desktop//Germany//sUBJECTS//Thesis//2301//food-mine//testcases//example.spec.js' // Test file
        ],
        preprocessors: {
            'C://Users//abc//Desktop//Germany//sUBJECTS//Thesis//2301//food-mine//Dummy//frontend//src//**//*.html': ['ng-html2js'], // Preprocess HTML files for AngularJS templates
            'C://Users//abc//Desktop//Germany//sUBJECTS//Thesis//2301//food-mine//Dummy//frontend//src//**//*.ts': ['coverage'],      // Instrument TypeScript files for coverage
            'C://Users//abc//Desktop//Germany//sUBJECTS//Thesis//2301//food-mine//Dummy//frontend//src//**//*.css': ['coverage']      // Instrument CSS files for coverage
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },
        ngHtml2JsPreprocessor: {
            moduleName: 'templates' // Module name for preprocessed HTML templates
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    });
};
