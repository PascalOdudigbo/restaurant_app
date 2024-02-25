const { Router } = require('express')

const router = Router();

// Importing the bookings controller functions
const {
    getAllBookings,
    getBookingById,
    addBooking
} = require("../controllers/booking_controller");

// A route to get all the bookings
router.get("/", getAllBookings);

// A router to get booking by ID
router.get("/:id", getBookingById); 

// A router to add a booking to the database
router.post("/", addBooking);

module.exports = router