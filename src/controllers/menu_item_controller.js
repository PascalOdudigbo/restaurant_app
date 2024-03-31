// Importing the menu item resources 
const { listAll, getById, save, update, destroy } = require("../resources/menu_item_resources");

// A controller function to get all menu categories
const getAllMenuItems = (req, res) => {
    try {
        // Call the listAll function from the resource file
        listAll(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// A controller function to get a menu item by ID
const getMenuItemById = (req, res) => {
    try {
        // Call the getById function from the resource file
        getById(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// A controller function to add a menu item to the database
const addMenuItem = (req, res) => {
    try {
        // Call the save function from the resource file
        save(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// A controller function to update menu item
const updateMenuItem = (req, res) => {
    try {
        // Call the update function from the resource file
        update(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// A controller function to delete menu item
const deleteMenuItem = (req, res) => {
    try {
        // Call the destroy function from the resource file
        destroy(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllMenuItems,
    getMenuItemById,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
}
