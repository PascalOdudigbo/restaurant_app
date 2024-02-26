// Importing the table resources 
const { listAll, getById, save, update, destroy } = require("../resources/menu_item_resources");

// A controller function to get all menu categories
const getAllTables = (req, res) => {
    try {
        // Call the listAll function from the resource file
        listAll(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// A controller function to get a table by ID
const getTableById = (req, res) => {
    try {
        // Call the getById function from the resource file
        getById(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// A controller function to add a table to the database
const addTable = (req, res) => {
    try {
        // Call the save function from the resource file
        save(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// A controller function to update table
const updateTable = (req, res) => {
    try {
        // Call the update function from the resource file
        update(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// A controller function to delete table
const deleteTable = (req, res) => {
    try {
        // Call the destroy function from the resource file
        destroy(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllTables,
    getTableById,
    addTable,
    updateTable,
    deleteTable
}
