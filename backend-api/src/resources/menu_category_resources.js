// Importing the Database connection
const client = require("../../db");

// Importing all menu category queries
const {
    getAllMenuCategories,
    getMenuCategoryById,
    getMenuCategoryByName,
    addMenuCategory,
    updateMenuCategory,
    deleteMenuCategory
} = require("../queries/menu_category_queries");

// A function to get all menu categories
const listAll = (req, res) => {
    client.query(getAllMenuCategories, (error, results) => {
        if (error) {
            console.error("Error fetching menu categories:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(results.rows);
    });
};

// A function to get a menu category by ID
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    // Using database connection to query the DB
    client.query(getMenuCategoryById, [id], (error, results) => {
        if (error) {
            console.error("Error fetching menu category:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // If Menu category doesn't exist
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Menu category not found." });
        }
        res.status(200).json(results.rows[0]);
    });
};

// A function to add a menu category to the database
const save = (req, res) => {
    const { name, description } = req.body;
    // Check if menu category exists
    client.query(getMenuCategoryByName, [name], (error, results) => {
        if(error){
            console.error("Error checking if menu category exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // If menu category  exists
        if(results.rows.length > 0){
            return res.status(409).json({ error: "Menu category already exists." });
        }
        // Creating new menu category
        client.query(addMenuCategory, [name, description], (error, results) => {
            if (error) {
                console.error("Error saving menu category:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(201).json(results.rows[0]);
        });
    })
    
};

// A function to update a menu category
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    // Checking if menu category exists
    client.query(getMenuCategoryById, [id], (error, results) => {
        if (error) {
            console.error("Error checking menu category exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // If the menu category doesn't exist
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Menu category not found." });
        }
        // Update the existing menu category
        client.query(updateMenuCategory, [name, description, id], (error, results) => {
            if (error) {
                console.error("Error updating menu category:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json(results.rows[0]);
        });
    });
};

// A function to delete a menu category
const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    // Checking if menu category exists
    client.query(getMenuCategoryById, [id], (error, results) => {
        if (error) {
            console.error("Error checking menu category exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // If the menu category doesn't exist
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Menu category not found." });
        }
        // Delete existing menu category
        client.query(deleteMenuCategory, [id], (error, results) => {
            if (error) {
                console.error("Error deleting menu category:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json("Menu category deleted successfully");
        });
    });
};

module.exports = {
    listAll,
    getById,
    save,
    update,
    destroy
};
