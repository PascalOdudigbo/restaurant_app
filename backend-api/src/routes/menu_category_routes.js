const { Router } = require('express')

const router = Router();

// Importing the menu categories controller functions
const {getAllMenuCategories, getMenuCategoryById, addMenuCategory, updateMenuCategory, deleteMenuCategory} = require("../controllers/menu_category_controller");

// A route to get all the menu categorys
router.get("/", getAllMenuCategories);

// A router to get menu category by ID
router.get("/:id", getMenuCategoryById);

// A router to add a menu category to the database
router.post("/", addMenuCategory);

// Router to update menu category
router.patch("/:id", updateMenuCategory);
router.put("/:id", updateMenuCategory);

// A route to delete user
router.delete("/:id", deleteMenuCategory);

module.exports = router