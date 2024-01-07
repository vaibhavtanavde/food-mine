describe('ValidateLogin', function() {
  it('Validate Login Page', function() {
    browser.get('http://localhost:4200/login');
    browser.sleep(3000);
    browser.manage().window().maximize();
    expect(browser.getTitle()).toBe("Frontend");
    console.log("Validate Login Page Passed");
  })
})

describe('Login', function() {
  it('Login Page', function() {
    element(by.css('input[placeholder="Email"]')).sendKeys("John@gmail.com");
    element(by.css('input[placeholder="Password"]')).sendKeys("12345");
    element(by.css('a[routerlink="/register"]')).click();
    console.log("Login Page Passed");
  })
})

describe('Register', function() {
  it('Register Page', function() {
    element(by.css('input[placeholder="Name"]')).sendKeys("Johnm");
    element(by.css('input[placeholder="Email"]')).sendKeys("John@gmail.com");
    element(by.css('input[placeholder="Password"]')).sendKeys("12345");
    element(by.css('input[placeholder="Confirm Password"]')).sendKeys("12345");
    element(by.css('input[placeholder="Address"]')).sendKeys("Spiegelgraben 37 96052 Bamberg");
    console.log("Register Page Passed");
  })
})

describe('Home', function() {
  it('Home Page', function() {
    element(by.css('a.logo[routerlink="/"]')).click();
    browser.sleep(5000);
    expect(browser.getTitle()).toBe("Frontend");
    console.log("Home Page Passed");
  })
})

describe('Search', function() {
  it('Search Functionality', function() {
    element(by.css('input[placeholder="Search Food Mine!"]')).sendKeys("Pizza");
    element(by.css('button[_ngcontent-ng-c882576285]')).click();
    element(by.css('img[src="assets/food-1.jpg"]'));
browser.sleep(5000);
console.log("Search Functionality1 Passed");
  })
})

describe('Search', function() {
  it('Search Functionality', function() {
    element(by.css('a.logo[routerlink="/"]')).click();
    element(by.css('input[placeholder="Search Food Mine!"]')).sendKeys("Meatball");
    element(by.css('button[_ngcontent-ng-c882576285]')).click();  // Search Button
    element(by.css('img[src="assets/food-2.jpg"]'));
browser.sleep(5000);
console.log("Search Functionality2 Passed");
  })
})

describe('Add to Cart', function() {
  it('Add to Cart Functionality', function() {
    element(by.css('a.logo[routerlink="/"]')).click();
    element(by.css('img[src="assets/food-1.jpg"]')).click();
browser.sleep(2000);
    element(by.css('button[_ngcontent-ng-c3903630442]')).click();  // add to Cart Button
console.log("Add to Cart Functionality Passed");
  })
})

describe('Remove from Add to Cart', function() {
  it('Remove from Functionality', function() {
    browser.sleep(2000);
    element(by.css('button[_ngcontent-ng-c4187611182]')).click(); // Remove Button
    browser.sleep(2000);
    element(by.css('a[ng-reflect-router-link="/"]')).click(); // Go to Home Page Link
    browser.sleep(5000);
console.log("Remove from Functionality Passed");
  })
})

