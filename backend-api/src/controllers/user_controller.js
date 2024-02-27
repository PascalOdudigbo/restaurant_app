// Importing the user resources 
const { listAll, getById, save, update, destroy, login, loggedIn } = require("../resources/user_resources");

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
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// A controller function to add a user to the database
const addUser = (req, res) => {
    try {
        // Call the dave function from the resource file
        save(req, res);
    } catch (error) {
        // In the eventuality of an error occuring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// A controller function to update user
const updateUser = (req, res) => {
    try {
        // call the update function from the resource file
        update(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// A controller function to delete user
const deleteUser = (req, res) => {
    try {
        // call the update function from the resource file
        destroy(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// A controller function to login user
const userLogin = (req, res) => {
    try {
        // Call the login function from the resource file
        login(req, res);
    } catch {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// A controller function to verify user loggedIn
const userLoggedIn = (req, res) => {
    try {
        // Call the loggedIn function from the resource file
        loggedIn(req, res);
    } catch {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    userLogin,
    userLoggedIn
}