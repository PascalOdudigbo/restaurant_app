const { Router } = require('express')

const router = Router();

// Importing the menu items controller functions
const {getAllMenuItems, getMenuItemById, addMenuItem, updateMenuItem, deleteMenuItem} = require("../controllers/menu_item_controller");

// A route to get all the menu items
router.get("/", getAllMenuItems);

// A router to get menu item by ID
router.get("/:id", getMenuItemById);

// A router to add a menu item to the database
router.post("/", addMenuItem);

// Router to update menu item
router.patch("/:id", updateMenuItem);
router.put("/:id", updateMenuItem);

// A route to delete user
router.delete("/:id", deleteMenuItem);

module.exports = router