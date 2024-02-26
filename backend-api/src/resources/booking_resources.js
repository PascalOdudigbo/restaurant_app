// Importing the Database connection
const client = require("../../db");

// Importing all booking queries
const {
    getAllBookings,
    getBookingById,
    addBooking,
    updateBooking,
    deleteBooking
} = require("../queries/booking_queries");

// A function to get all bookings
const listAll = (req, res) => {
    client.query(getAllBookings, (error, results) => {
        if (error) {
            console.error("Error fetching bookings:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(results.rows);
    });
};

// A function to get booking by ID
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getBookingById, [id], (error, results) => {
        if (error) {
            console.error("Error fetching booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Booking not found." });
        }
        res.status(200).json(results.rows[0]);
    });
};

// A function to add a booking to the database
const save = (req, res) => {
    const { user_id, prefered_date, prefered_guests, occasion, message, status } = req.body;
    client.query(addBooking, [user_id, prefered_date, prefered_guests, occasion, message, status], (error, results) => {
        if (error) {
            console.error("Error saving booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json(results.rows[0]);
    });
};

// A function to update a booking
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { user_id, prefered_date, prefered_guests, occasion, message, status } = req.body;
    client.query(getBookingById, [id], (error, results) => {
        if (error) {
            console.error("Error checking booking exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Booking not found." });
        }
        client.query(updateBooking, [user_id, prefered_date, prefered_guests, occasion, message, status, id], (error, results) => {
            if (error) {
                console.error("Error updating booking:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json(results.rows[0]);
        });
    });
};

// A function to delete a booking
const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getBookingById, [id], (error, results) => {
        if (error) {
            console.error("Error checking booking exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Booking not found." });
        }
        client.query(deleteBooking, [id], (error, results) => {
            if (error) {
                console.error("Error deleting booking:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json("Booking deleted successfully");
        });
    });
};

module.exports = {
    listAll,
    getById,
    save,
    update,
    destroy
};
