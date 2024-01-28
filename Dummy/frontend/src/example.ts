// example.ts

// Define a TypeScript class
class Greeter {
    private greeting: string;
  
    constructor(message: string) {
      this.greeting = message;
    }
  
    greet() {
      return "Hello, " + this.greeting;
    }
  }
  
  // Export the class to make it accessible in other files
  export default Greeter;
  