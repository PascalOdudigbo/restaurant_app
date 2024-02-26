// Importing the Database connection
const client = require("../../db");

// Importing all menu item queries
const {
    getAllMenuItems,
    getMenuItemById,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require("../queries/menu_item_queries");

// A function to get all menu items
const listAll = (req, res) => {
    client.query(getAllMenuItems, (error, results) => {
        if (error) {
            console.error("Error fetching menu items:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(results.rows);
    });
};

// A function to get menu item by ID
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getMenuItemById, [id], (error, results) => {
        if (error) {
            console.error("Error fetching menu item:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Menu item not found." });
        }
        res.status(200).json(results.rows[0]);
    });
};

// A function to add a menu item to the database
const save = (req, res) => {
    const { menu_category_id, name, description, price, image, image_public_id, is_available } = req.body;
    client.query(addMenuItem, [menu_category_id, name, description, price, image, image_public_id, is_available], (error, results) => {
        if (error) {
            console.error("Error saving menu item:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json(results.rows[0]);
    });
};

// A function to update a menu item
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { menu_category_id, name, description, price, image, image_public_id, is_available } = req.body;
    client.query(getMenuItemById, [id], (error, results) => {
        if (error) {
            console.error("Error checking menu item exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Menu item not found." });
        }
        client.query(updateMenuItem, [menu_category_id, name, description, price, image, image_public_id, is_available, id], (error, results) => {
            if (error) {
                console.error("Error updating menu item:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json(results.rows[0]);
        });
    });
};

// A function to delete a menu item
const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getMenuItemById, [id], (error, results) => {
        if (error) {
            console.error("Error checking menu item exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Menu item not found." });
        }
        client.query(deleteMenuItem, [id], (error, results) => {
            if (error) {
                console.error("Error deleting menu item:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json("Menu item deleted successfully");
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
