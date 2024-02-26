// Importing the order Item resources 
const { listAll, getById, save, update, destroy } = require("../resources/order_item_resources");

// A controller function to get all menu categories
const getAllOrderItems = (req, res) => {
    try {
        // Call the listAll function from the resource file
        listAll(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// A controller function to get a order Item by ID
const getOrderItemById = (req, res) => {
    try {
        // Call the getById function from the resource file
        getById(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// A controller function to add a order Item to the database
const addOrderItem = (req, res) => {
    try {
        // Call the save function from the resource file
        save(req, res);
    } catch (error) {
        // In the eventuality of an error occurring
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// A controller function to update order Item 
const updateOrderItem = (req, res) => {
    try {
        // Call the update function from the resource file
        update(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// A controller function to delete order Item I
const deleteOrderItem = (req, res) => {
    try {
        // Call the destroy function from the resource file
        destroy(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllOrderItems,
    getOrderItemById,
    addOrderItem,
    updateOrderItem,
    deleteOrderItem
}
