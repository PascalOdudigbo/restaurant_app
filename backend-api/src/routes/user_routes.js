const { Router } = require('express');

const router = Router();

// Importing the controller functions
const {
    getAllUsers,
    getUserById
} = require("../controllers/user_controller");

// A route to list all users
router.get('/', getAllUsers);
// A route to get user by ID
router.post('/:id', getUserById);

module.exports = router;
