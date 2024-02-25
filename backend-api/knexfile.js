require('dotenv').config()

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            user: process.env.PGUSER,
            password: process.env.PASSWORD, 
            host: process.env.HOST,
            port: 10049,
            database: "restaurant_application_db",
            ssl: {
                rejectUnauthorized: false,
                ca: process.env.CA_CERTIFICATE
            }
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    }
};
