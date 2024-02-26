const { Router } = require('express');

const router = Router();

// Importing the controller functions
const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = require("../controllers/user_controller");

// A route to list all users
router.get('/', getAllUsers);

// A route to get user by ID
router.get('/:id', getUserById);

// A route to add a user to the database
router.post('/', addUser);

// Routers to update users
router.patch("/:id", updateUser);
router.put("/:id", updateUser);

// A route to delete user
router.delete("/:id", deleteUser);

module.exports = router;
