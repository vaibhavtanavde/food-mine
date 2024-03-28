//example_spec.js
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
  let loginPageComponent;

  beforeEach(() => {
    if (typeof LoginPageComponent !== 'undefined') {
      loginPageComponent = new LoginPageComponent(); 
    }
  });

  it('Login Page', async function() {
    if (loginPageComponent) {
      loginPageComponent.group();
      loginPageComponent.login();
      loginPageComponent.subscribe();
      loginPageComponent.navigateByUrl();
    }
    element(by.css('a[ng-reflect-router-link="/register"]')).click();
    console.log("Login Page Passed");
  });
});




describe('Register', function() {
  it('Register Page', function() {
    element(by.css('input[placeholder="Name"]')).sendKeys("Vaibhav T");
    element(by.css('input[placeholder="Email"]')).sendKeys("vaibhav707@gmail.com");
    element(by.css('input[placeholder="Password"]')).sendKeys("12345");
    element(by.css('input[placeholder="Confirm Password"]')).sendKeys("12345");
    element(by.css('input[placeholder="Address"]')).sendKeys("Spiegelgraben 37 96052 Bamberg");
    element(by.css('button[_ngcontent-ng-c3669804731]')).click();
    console.log("Register Page Passed");
  })
})


describe('Home', function() {
  it('Home Page', function() {
   // element(by.css('a.logo[routerlink="/"]')).click();
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

describe('Cart', function() {
  let cartPageComponent;

  beforeEach(() => {
    if (typeof CartPageComponent !== 'undefined') {
      cartPageComponent = new CartPageComponent();
    }
  });

  it('Add to Cart Functionality', async function() {
    if (cartPageComponent) {
      cartPageComponent.removeFromCart();
      cartPageComponent.changeQuantity();
    }

    element(by.css('a.logo[routerlink="/"]')).click();
    element(by.css('img[src="assets/food-1.jpg"]')).click();
    browser.sleep(2000);
    element(by.css('button[_ngcontent-ng-c3903630442]')).click();  // add to Cart Button
    
    console.log("Add to Cart Functionality Passed");
  });
});


describe('Cart', function() {
  it('Remove from Functionality', function() {
    browser.sleep(2000);
    element(by.css('button[_ngcontent-ng-c4187611182]')).click(); // Remove Button
    browser.sleep(2000);
    element(by.css('a[ng-reflect-router-link="/"]')).click(); // Go to Home Page Link
    browser.sleep(5000);
console.log("Remove from Add to Cart Page Functionality Passed");
  })
})

describe('Cart', function() {
  it('Proceed to Cart Functionality', function() {
    browser.sleep(2000);
    element(by.css('img[src="assets/food-1.jpg"]')).click();
browser.sleep(2000);
    element(by.css('button[_ngcontent-ng-c3903630442]')).click();  // Add to Cart Button
    element(by.css('a[ng-reflect-router-link="/checkout"]')).click();  // Proceed to Cart button
    browser.sleep(5000);
console.log("Proceed to Cart Functionality Passed");
  })
})

describe('Payment', function() {
  it('Remove from Payment Page Functionality', function() {
    element(by.css('a[ng-reflect-router-link="/cart-page"]')).click(); // Cart button
    browser.sleep(2000);  
    element(by.css('button[_ngcontent-ng-c4187611182]')).click(); // Remove Button
    browser.sleep(2000);
    element(by.css('a[ng-reflect-router-link="/"]')).click(); // Go to Home Page Link
    browser.sleep(5000);

console.log("Remove from Payment Page Functionality Passed");
  })
})

describe('Checkout', function() {
  it('Logout Page Functionality', function() { 
    element(by.css('a[ng-reflect-router-link="/dashboard"]')).click(); // Dashboard Page
    browser.sleep(5000);
    element(by.linkText('Logout')).click(); // Go to Home Page Link
    browser.sleep(5000);

console.log("Logout Page Functionality Passed");
  })
})



