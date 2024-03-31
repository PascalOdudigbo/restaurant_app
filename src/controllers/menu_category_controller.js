// Importing the menu category resources 
const { listAll, getById, save, update, destroy } = require("../resources/menu_category_resources");

// A controller function to get all menu categories
const getAllMenuCategories = (req, res) => {
    try {
        // Call the listAll function from the resource file
        listAll(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// A controller function to get a menu category by ID
const getMenuCategoryById = (req, res) => {
    try {
        // Call the getById function from the resource file
        getById(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// A controller function to add a menu category to the database
const addMenuCategory = (req, res) => {
    try {
        // Call the save function from the resource file
        save(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// A controller function to update menu category
const updateMenuCategory = (req, res) => {
    try {
        // Call the update function from the resource file
        update(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// A controller function to delete menu category
const deleteMenuCategory = (req, res) => {
    try {
        // Call the destroy function from the resource file
        destroy(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllMenuCategories,
    getMenuCategoryById,
    addMenuCategory,
    updateMenuCategory,
    deleteMenuCategory
}
