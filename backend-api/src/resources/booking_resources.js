// Importing the Database connection
const client = require("../../db");

// Importing all booking queries
const {
    getAllBookings,
    getBookingById,
    getBookingByUserId,
    addBooking,
    updateBooking,
    deleteBooking
} = require("../queries/booking_queries");

const { getUserById } = require("../queries/user_queries");

// A function to get all bookings
const listAll = (req, res) => {
    client.query(getAllBookings, (error, results) => {
        if (error) {
            console.error("Error fetching bookings:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const bookingPromises = results.rows.map(booking => {
            return new Promise((resolve, reject) => {
                getUserByIdFunc(booking.user_id, getUserById)
                    .then(user => {
                        booking.user = user;
                        resolve(booking);
                    })
                    .catch(error => reject(error));
            });
        });

        Promise.all(bookingPromises)
            .then(allBookings => {
                res.status(200).json(allBookings);
            })
            .catch(error => {
                console.error("Error fetching booking user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            });
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
    const { user_id, preferred_date, preferred_guests, occasion, message, status } = req.body;
    client.query(addBooking, [user_id, preferred_date, preferred_guests, occasion, message, status], (error, results) => {
        if (error) {
            console.error("Error saving booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({message: "Booking submitted successfully!", booking: results.rows[0]});
    });
};

// A function to update a booking
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { user_id, preferred_date, preferred_guests, occasion, message, status } = req.body;
    client.query(getBookingById, [id], (error, results) => {
        if (error) {
            console.error("Error checking booking exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Booking not found." });
        }
        client.query(updateBooking, [user_id, preferred_date, preferred_guests, occasion, message, status, id], (error, results) => {
            if (error) {
                console.error("Error updating booking:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json({message: "Booking updated successfully!", booking: results.rows[0]});
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
            res.status(200).json({message: "Booking deleted successfully!"});
        });
    });
};

// A function to get booking by user id
const getByUserId = (req, res) => {
    const user_id = parseInt(req.params.user_id)
    client.query(getBookingByUserId, [user_id], (error, results) => {
        if (error) {
            console.error("Error fetching bookings:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const bookingPromises = results.rows.map(booking => {
            return new Promise((resolve, reject) => {
                getUserByIdFunc(booking.user_id, getUserById)
                    .then(user => {
                        booking.user = user;
                        resolve(booking);
                    })
                    .catch(error => reject(error));
            });
        });

        Promise.all(bookingPromises)
            .then(allBookings => {
                res.status(200).json(allBookings);
            })
            .catch(error => {
                console.error("Error fetching booking user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PRIVATE FUNCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// A function to get a user by ID
const getUserByIdFunc = (id, getUserById) => {
    return new Promise((resolve, reject) => {
        client.query(getUserById, [id], (error, results) => {
            if (error) {
                console.error("Error fetching user:", error);
                reject(error);
            } else if (results.rows.length === 0) {
                reject("User not found.");
            } else {
                resolve(results.rows[0]);
            }
        });
    });
};

module.exports = {
    listAll,
    getById,
    save,
    update,
    destroy,
    getByUserId
};
