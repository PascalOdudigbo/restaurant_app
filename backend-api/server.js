// Importing express
const express = require('express');

// Import the database connection
const client = require("./db");

// Importing all the route files
const userRoutes = require('./src/routes/user_routes');

const app = express();
const port = process.env.PORT || 3001;

client.connect()
    .then(() => {
        console.log('Connected to the PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to the PostgreSQL database:', err);
    });

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Creating a path for user that links to the user routes
app.use('/users', userRoutes);

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});