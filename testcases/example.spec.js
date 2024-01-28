// example.spec.js
describe('Protractor Demo App', function() {
    it('should have a title', function() {
      browser.get('http://www.example.com');
      expect(browser.getTitle()).toEqual('Example Domain');
    });
  });
  
  // Reference JavaScript function
  console.log(add(5, 7));
  