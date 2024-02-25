// Importing PostgreSql
const pg = require('pg');
// Enabling the use of environment variables
require('dotenv').config();

// Defining the database configuration
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

// Initializing the database client
const client = new pg.Client(config);

module.exports = client