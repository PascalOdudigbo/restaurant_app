const getAllBookings = "SELECT * FROM bookings";
const getBookingById = "SELECT * FROM bookings WHERE id = $1";
const addBooking = "INSERT INTO bookings (user_id, prefered_date, prefered_guests, occasion, message, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
const updateBooking = "UPDATE bookings SET user_id = COALESCE($1, user_id), prefered_date = COALESCE($2, prefered_date), prefered_guests = COALESCE($3, prefered_guests), occasion = COALESCE($4, occasion), message = COALESCE($5, message), status = COALESCE($6, status) WHERE id = $7 RETURNING *";
const deleteBooking = "DELETE FROM bookings WHERE id = $1";


module.exports = {
    getAllBookings,
    getBookingById,
    addBooking,
    updateBooking,
    deleteBooking
}