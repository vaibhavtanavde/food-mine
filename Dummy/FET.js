class Calculator {
    add(a, b) {
      return a + b;
    } 
    subtract(a, b) {
      return a - b;
    }
  } 
  class CalculatorTest {
    constructor() {
      this.calculator = new Calculator(); // Fixture element: Calculator instance
    } 
    testAddition()  {
      const result = this.calculator.add(3, 4);
      console.log(result); // Expected output: 7
    }  
    testSubtraction() {
      const result = this.calculator.subtract(7, 4);
      console.log(result); // Expected output: 3
    }
  }
  // Test runner
  function runTests() {
    const test = new CalculatorTest();
    for (const methodName in test) {
      if (methodName.startsWith('test')) {
        console.log(`Running test: ${methodName}`);
        test[methodName](); // Invoke test method
      }
    }
  }
  runTests();
  