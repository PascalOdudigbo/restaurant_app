// Importing the Booking resources
const { listAll, getById, save, update, destroy } = require("../resources/booking_resources");

// A conroller function to get all bookings
const getAllBookings = (req, res) => {
    try {
        // Call the listAll function from the resource file
        listAll(req, res);
    } catch (error) {
        // In the eventuality of an error occuring
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

// A conroller function to get a booking by ID
const getBookingById = (req, res) => {
    try {
        // Call the getByID function from the resource file
        getById(req, res)

    } catch (error) {
        // In the eventuality of an error occuring
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// A controller function to add a booking to the database
const addBooking = (req, res) => {
    try {
        // Call the save function from the resource file
        save(req, res);

    } catch (error) {
        // In the eventuality of an error occuring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
}

// A controller function to update booking
const updateBooking = (req, res) => {
    try {
        // Call the save function from the resource file
        update(req, res);

    } catch (error) {
        // In the eventuality of an error occuring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
}

// A controller function to delete booking
const deleteBooking = (req, res) => {
    try {
        // call the update function from the resource file
        destroy(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getAllBookings,
    getBookingById,
    addBooking,
    updateBooking,
    deleteBooking
}