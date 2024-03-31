const { Router } = require('express')

const router = Router();

// Importing the menu categories controller functions
const {getAllTables, getTableById, addTable, updateTable, deleteTable} = require("../controllers/table_controller");

// A route to get all the menu categorys
router.get("/", getAllTables);

// A router to get menu category by ID
router.get("/:id", getTableById);

// A router to add a menu category to the database
router.post("/", addTable);

// Router to update menu category
router.patch("/:id", updateTable);
router.put("/:id", updateTable);

// A route to delete user
router.delete("/:id", deleteTable);

module.exports = router