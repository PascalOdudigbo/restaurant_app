const express = require('express');
const pg = require('pg');
// Load environment variables from .env file
require('dotenv').config();





const app = express();
const PORT = process.env.PORT || 3000;

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: "restaurant_application_db",
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.CA_CERTIFICATE,
    },
};

const client = new pg.Client(config);

app.get('/', (req, res) => {
    client.connect(function (err) {
        if (err) {
            res.status(500).json({ error: 'Error connecting to the database' });
            return;
        }
        
        client.query("SELECT VERSION()", [], function (err, result) {
            if (err) {
                res.status(500).json({ error: 'Error querying the database' });
                return;
            }

            res.send(`Database version: ${result.rows[0].version}`);
            client.end(function (err) {
                if (err) {
                    console.error('Error closing the database connection:', err);
                }
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
