const getAllBookings = "SELECT * FROM bookings ORDER BY id DESC";
const getBookingById = "SELECT * FROM bookings WHERE id = $1";
const getBookingByUserId = "SELECT * FROM bookings WHERE user_id = $1 ORDER BY id DESC";
const addBooking = "INSERT INTO bookings (user_id, preferred_date, preferred_guests, occasion, message, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
const updateBooking = "UPDATE bookings SET user_id = COALESCE($1, user_id), preferred_date = COALESCE($2, preferred_date), preferred_guests = COALESCE($3, preferred_guests), occasion = COALESCE($4, occasion), message = COALESCE($5, message), status = COALESCE($6, status) WHERE id = $7 RETURNING *";
const deleteBooking = "DELETE FROM bookings WHERE id = $1";


module.exports = {
    getAllBookings,
    getBookingById,
    getBookingByUserId,
    addBooking,
    updateBooking,
    deleteBooking
}