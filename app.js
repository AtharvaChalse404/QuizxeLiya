const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// Path to the JSON file
const usersFilePath = path.join(__dirname, 'users.json');

// Handle form submission
app.post('/submit', (req, res) => {
    const { username, email } = req.body;

    // Read existing user data from the JSON file
    let users = [];
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        console.error('Error reading users file:', err);
    }

    // Create a new user object
    const newUser = {
        username: username,
        email: email
    };

    // Add the new user to the array
    users.push(newUser);

    // Write updated user data back to the JSON file
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
        console.log('User added:', newUser);
    } catch (err) {
        console.error('Error writing users file:', err);
    }

    res.redirect('/index.html');
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Test route to read and print the contents of users.json
app.get('/test', (req, res) => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        const users = JSON.parse(data);
        console.log('Users:', users);
        res.send('Check the console for user data');
    } catch (err) {
        console.error('Error reading users file:', err);
        res.status(500).send('Error reading users file');
    }
});