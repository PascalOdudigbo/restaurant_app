const { Router } = require('express');

const router = Router();

// Importing the controller functions
const {
    getAllUsers,
    getUserById,
    addUser
} = require("../controllers/user_controller");

// A route to list all users
router.get('/', getAllUsers);

// A route to get user by ID
router.get('/:id', getUserById);

// A route to add a user to the database
router.post('/', addUser);

module.exports = router;
