const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Route to serve the HTML file
app.get('/', (req, res) => {
    // Read the HTML file synchronously
    const htmlContent = fs.readFileSync(path.join(__dirname, 'example.html'), 'utf8');
    // Send the HTML file as the response
    res.send(htmlContent);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
