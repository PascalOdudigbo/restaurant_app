const { Router } = require('express');

const router = Router();

// Importing the controller functions
const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser
} = require("../controllers/user_controller");

// A route to list all users
router.get('/', getAllUsers);

// A route to get user by ID
router.get('/:id', getUserById);

// A route to add a user to the database
router.post('/', addUser);

// Routers to update users
router.patch("/:id", updateUser);
router.put("/:id", updateUser);

module.exports = router;
