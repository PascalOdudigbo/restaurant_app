module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            user: process.env.USER,
            password: process.env.PASSWORD,
            host: process.env.HOST,
            port: process.env.PORT,
            database: "restaurant_application_db",
            ssl: {
                rejectUnauthorized: true,
                ca: process.env.CA_CERTIFICATE,
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