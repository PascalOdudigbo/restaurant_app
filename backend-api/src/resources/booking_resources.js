// Importing the Database connection
const { response } = require("express");
const client = require("../../db");

//importing all booking querries
const {
    getAllBookings,
    getBookingById,
    addBooking,
    updateBooking,
    deleteBooking
} = require("../queries/booking_queries");

// A function to get all bookings
const listAll = (req, res) => {
    // Using the database connection to querry the database
    client.query(getAllBookings, (error, results) => {
        // Return error message if it occurs
        if (error) {
            console.error("Error fetching bookings:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        // Return the database response as JSON if request is successful
        res.status(200).json(results.rows);
    })

}

// A function to get booking by ID
const getById = (req, res) => {
    // Getting the booking ID from the request params and Parsing it to Integer
    const id = parseInt(req.params.id)
    // Using the database connection to querry the database
    client.query(getBookingById, [id], (error, response) => {
        // Return error message if it occurs
        if (error) {
            console.error("Error fetching booking: ", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        // Return the database connection as JSON if successful
        res.status(200).json(results.rows[0]);
    })
}


module.exports = {
    listAll,
    getById
}
