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

const listAll = (req, res) => {
    // Using the database connection to querry the database
    client.query(getAllUsers, [],(error, results) => {
        // Return error message if it occurs
        if(error){
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        // return the database response as JSON if request is successful
        res.status(200).json(results.rows);
    })

}

module.exports = {
    listAll
}