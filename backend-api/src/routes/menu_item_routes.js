const { Router } = require('express')

const router = Router();

// Importing the menu categories controller functions
const {getAllMenuItems, getMenuItemById, addMenuItem, updateMenuItem, deleteMenuItem} = require("../controllers/menu_item_controller");

// A route to get all the menu categorys
router.get("/", getAllMenuItems);

// A router to get menu category by ID
router.get("/:id", getMenuItemById);

// A router to add a menu category to the database
router.post("/", addMenuItem);

// Router to update menu category
router.patch("/:id", updateMenuItem);
router.put("/:id", updateMenuItem);

// A route to delete user
router.delete("/:id", deleteMenuItem);

module.exports = router