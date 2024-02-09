const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

// Define a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

// Create a Mongoose model
const User = mongoose.model('User', userSchema);

// Handle form submission
app.post('/submit', async (req, res) => {
  const { username, email } = req.body;

  try {
    // Create a new user document
    const newUser = new User({
      username: username,
      email: email,
    });

    // Save the new user document to the database
    await newUser.save();

    console.log('User added:', newUser);
    res.redirect('/index.html');
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error saving user');
  }
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

module.exports = app;
