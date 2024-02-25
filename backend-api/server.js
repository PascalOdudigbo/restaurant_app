const express = require('express');
const pg = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const config = {
    user: process.env.PGUSER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 10049,
    database: "restaurant_application_db",
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.CA_CERTIFICATE
    }
};

const client = new pg.Client(config);

// Connect to the PostgreSQL database
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

// Start the Express server
app.listen(port, () => {
    console.log(process.env.HOST)
    console.log(`Server is running on port ${port}`);
});
