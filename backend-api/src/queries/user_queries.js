// Writing all user queries
const getAllUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkUserExists = "SELECT * FROM users WHERE email = $1";
const addUser = "INSERT INTO users (name, mobile_number, postcode, email, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
const updateUser = "UPDATE users SET name = COALESCE($1, name), mobile_number = COALESCE($2, mobile_number), postcode = COALESCE($3, postcode), email = COALESCE($4, email), password = COALESCE($5, password), role = COALESCE($6, role) WHERE id = $7 RETURNING *";
const deleteUser = "DELETE FROM users WHERE id = $1";

// Exporting the queries
module.exports = {
    getAllUsers,
    getUserById,
    checkUserExists,
    addUser,
    updateUser,
    deleteUser
}