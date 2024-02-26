// Importing express
const express = require('express');

// Import the database connection
const client = require("./db");

// Importing all the route files
const userRoutes = require('./src/routes/user_routes');
const bookingRoutes = require('./src/routes/booking_routes');
const menuCategoryRoutes = require('./src/routes/menu_category_routes');
const menuItemRoutes = require('./src/routes/menu_item_routes');
const tableRoutes = require('./src/routes/table_routes');
const orderRoutes = require('./src/routes/order_routes');
const orderItemRoutes = require('./src/routes/order_item_routes');





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

// Creating an API route user that links to the user routes
app.use('/users', userRoutes);

// Creating an API route for bookings that links to the booking routes
app.use('/bookings', bookingRoutes);

// Creating an API route for menu categories that links to the menu category routes
app.use('/bookings', menuCategoryRoutes);

// Creating an API route for menu items that links to the menu item routes
app.use('/bookings', menuItemRoutes);

// Creating an API route for tables that links to the table routes
app.use('/bookings', tableRoutes);

// Creating an API route for orders that links to the order routes
app.use('/bookings', orderRoutes);

// Creating an API route for order items that links to the order items routes
app.use('/bookings', orderItemRoutes);

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});