const { Router } = require('express')

const router = Router();

// Importing the bookings controller functions
const {
    getAllBookings,
    getBookingById
} = require("../controllers/booking_controller");

// A route to get all the bookings
router.get("/", getAllBookings);

// A routr to get booking by ID
router.get("/:id", getBookingById); 

module.exports = router