// Importing the Database connection
const client = require("../../db");

// Importing all order item queries
const {
    getAllOrderItems,
    getOrderItemById,
    checkOrderItemExists,
    addOrderItem,
    updateOrderItem,
    deleteOrderItem
} = require("../queries/order_item_queries");

// A function to get all order items
const listAll = (req, res) => {
    client.query(getAllOrderItems, (error, results) => {
        if (error) {
            console.error("Error fetching order items:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(results.rows);
    });
};

// A function to get order item by ID
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getOrderItemById, [id], (error, results) => {
        if (error) {
            console.error("Error fetching order item:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Order item not found." });
        }
        res.status(200).json(results.rows[0]);
    });
};

// A function to add an order item to the database
const save = (req, res) => {
    const { order_id, menu_item_id, quantity } = req.body;
    // Check if the user already has an exact order item and increment its quantity instead of duplicating it
    client.query(checkOrderItemExists, [order_id, menu_item_id], (error, results) => {
        if (error) {
            console.error("Error checking order item exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length > 0) {
            // If order item already exists, increment its quantity
            const existingQuantity = results.rows[0].quantity;
            const newQuantity = existingQuantity + quantity;
            // Update the order item quantity
            client.query(updateOrderItem, [order_id, menu_item_id, newQuantity], (error, results) => {
                if (error) {
                    console.error("Error updating order item:", error);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                res.status(200).json(results.rows[0]);
            });
        } else {
            // If order item doesn't exist, add it as new
            client.query(addOrderItem, [order_id, menu_item_id, quantity], (error, results) => {
                if (error) {
                    console.error("Error saving order item:", error);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                res.status(201).json({message: "Item added to cart successfully!", order_item: results.rows[0]});
            });
        }
    });
};

// A function to update an order item
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { order_id, menu_item_id, quantity } = req.body;
    // Checking if order item exists
    client.query(getOrderItemById, [id], (error, results) => {
        if (error) {
            console.error("Error checking order item exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Order item not found." });
        }
        // Update the existing order item
        client.query(updateOrderItem, [order_id, menu_item_id, quantity, id], (error, results) => {
            if (error) {
                console.error("Error updating order item:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json(results.rows[0]);
        });
    });
};

// A function to delete an order item
const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getOrderItemById, [id], (error, results) => {
        if (error) {
            console.error("Error checking order item exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Order item not found." });
        }
        client.query(deleteOrderItem, [id], (error, results) => {
            if (error) {
                console.error("Error deleting order item:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json("Order item deleted successfully");
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
