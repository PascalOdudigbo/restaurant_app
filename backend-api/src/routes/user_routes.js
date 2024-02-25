const {Router} = require('express');

const router = Router();

// Importing the controller functions
const {getAllUsers} = require("../controllers/user_controller");

router.get('/', getAllUsers);

module.exports = router;
