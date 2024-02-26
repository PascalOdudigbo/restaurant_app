// Importing the Database connection
const client = require("../../db");

// Importing all order queries
const {
    getAllOrders,
    getOrderById,
    checkIfUserHasOpenOrder,
    addOrder,
    updateOrder,
    deleteOrder
} = require("../queries/order_queries");

// A function to get all orders
const listAll = (req, res) => {
    client.query(getAllOrders, (error, results) => {
        if (error) {
            console.error("Error fetching orders:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(results.rows);
    });
};

// A function to get order by ID
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getOrderById, [id], (error, results) => {
        if (error) {
            console.error("Error fetching order:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Order not found." });
        }
        res.status(200).json(results.rows[0]);
    });
};

// A function to add an order to the database
const save = (req, res) => {
    const { user_id, table_id, status } = req.body;

    // Check if user already has an open order
    client.query(checkIfUserHasOpenOrder, [user_id], (error, results) => {
        if (error) {
            console.error("Error checking existing order:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // Returning existing order if it exists
        if (results.rows.length > 0) {
            return res.status(200).json(results.rows[0]);
        }
        // Creating a new order if user has no open orders
        client.query(addOrder, [user_id, table_id, status], (error, results) => {
            if (error) {
                console.error("Error saving order:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(201).json(results.rows[0]);
        });
    });
};

// A function to update an order
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { user_id, table_id, status } = req.body;
    client.query(getOrderById, [id], (error, results) => {
        if (error) {
            console.error("Error checking order exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Order not found." });
        }
        client.query(updateOrder, [user_id, table_id, status, id], (error, results) => {
            if (error) {
                console.error("Error updating order:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json(results.rows[0]);
        });
    });
};

// A function to delete an order
const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getOrderById, [id], (error, results) => {
        if (error) {
            console.error("Error checking order exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Order not found." });
        }
        client.query(deleteOrder, [id], (error, results) => {
            if (error) {
                console.error("Error deleting order:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json("Order deleted successfully");
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
