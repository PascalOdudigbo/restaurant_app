const { Router } = require('express')

const router = Router();

// Importing the bookings controller functions
const { getAllBookings, getBookingById, addBooking, updateBooking, deleteBooking } = require("../controllers/booking_controller");

// A route to get all the bookings
router.get("/", getAllBookings);

// A router to get booking by ID
router.get("/:id", getBookingById);

// A router to add a booking to the database
router.post("/", addBooking);

// Router to update booking
router.patch("/:id", updateBooking);
router.put("/:id", updateBooking);

// A route to delete user
router.delete("/:id", deleteBooking);

module.exports = router