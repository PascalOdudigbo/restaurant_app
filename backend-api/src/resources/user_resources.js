// Import the database connection
const client = require("../../db");

// Importing the user queries
const {
    getAllUsers,
    getUserById,
    checkUserExists,
    addUser,
    updateUser,
    deleteUser

} = require("../queries/user_queries")


// A function to list all users
const listAll = (req, res) => {
    // Using the database connection to querry the database
    client.query(getAllUsers, (error, results) => {
        // Return error message if it occurs
        if (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        // return the database response as JSON if request is successful
        res.status(200).json(results.rows);
    })

}

// A function to get a user by ID
const getById = (req, res) => {
    // Getting the id from the request parameters and converting it to integer
    const id = parseInt(req.params.id);
    // Using the database connection to query the database
    client.query(getUserById, [id], (error, results) => {
        // Return an error if need
        if (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        // Return the database response as JSON if request is successful
        res.status(200).json(results.rows[0]);
    })

}

module.exports = {
    listAll,
    getById
}