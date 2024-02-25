// Importing the user resources 
const { listAll, getById } = require("../resources/user_resources");

// A conroller function to get all users
const getAllUsers = (req, res) => {
    try {
        // Call the listAll function from the resource file
        listAll(req, res);
    } catch (error) {
        // In the eventuality of an error occuring
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// A controller function to get a user by ID
const getUserById = (req, res) => {
    try {
        // Call the getById function from the resource file
        getById(req, res);

    } catch (error) {
        // In the eventuality of an error occuring
        console.error(error);
        res.status(500).json({error: "Internal Server Error" });
    }
}

module.exports = {
    getAllUsers,
    getUserById
}