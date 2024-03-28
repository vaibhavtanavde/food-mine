// login.js - Contains login functionality

function login(username, password) {
    // Implementation of login functionality
    // For simplicity, let's assume successful login if username and password match
    if (username === 'exampleuser' && password === 'password') {
        return true; // Login successful
    } else {
        return false; // Login failed
    }
}

module.exports = {
    login: login
};
