// Importing the Database connection
const client = require("../../db");
const { getOrderItemsByOrderId } = require("../queries/order_item_queries");

// Importing all order queries
const {
    getAllOrders,
    getOrderById,
    checkIfUserHasOpenOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUserId
} = require("../queries/order_queries");

// Importing the menuItem querries
const {getMenuItemById} = require("../queries/menu_item_queries");

// A function to get all orders
const listAll = (req, res) => {
    client.query(getAllOrders, (error, results) => {
        if (error) {
            console.error("Error fetching orders:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const orderPromises = results.rows.map(order => {
            return new Promise((resolve, reject) => {
                getOrderItemsByOrderIdFunc(order.id, getOrderItemsByOrderId)
                    .then(orderItems => {
                        // Ensure orderItems are not null or undefined
                        if (orderItems && orderItems.length > 0) {
                            // Use map directly on orderItems and assign to orderItemsData
                            const orderItemsData = orderItems.map(orderItem => orderItem);
                            // Assign orderItemsData to order.order_items
                            order.order_items = orderItemsData;
                        } else {
                            // Assign an empty array if no order items are found
                            order.order_items = [];
                        }
                        resolve(order)
                    })
                    .catch(error => reject(error));
            });
        });

        // Ensure orderPromises resolves even if there are no order items
        Promise.all(orderPromises)
            .then(allOrders => {
                res.status(200).json(allOrders);
            })
            .catch(error => {
                console.error("Error fetching order items: ", error);
                return res.status(500).json({ error: "Internal Server Error" });
            });
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
        // Map over order results to create promises for fetching order items
        const orderPromises = results.rows.map(order => {
            return getOrderItemsByOrderIdFunc(order.id, getOrderItemsByOrderId)
                .then(orderItems => {
                    // If no order items, assign empty array to order
                    if (!orderItems || orderItems.length === 0) {
                        order.order_items = [];
                        return order;
                    }

                    // Map over order items to create promises for fetching menu items
                    const orderItemsPromises = orderItems.map(orderItem => {
                        return new Promise((resolve, reject) => {
                            client.query(getMenuItemById, [orderItem.menu_item_id], (error, results) => {
                                // Handle query error
                                if (error) {
                                    console.error("Error fetching order item's menu item:", error);
                                    reject({ error: "Internal Server Error" });
                                }
                                // If menu item not found, resolve with null (or handle as necessary)
                                if (results.rows.length === 0) {
                                    console.error("Order item's menu item not found.");
                                    resolve(null);
                                }
                                // Assign menu item to order item
                                orderItem.menu_item = results.rows[0];
                                resolve(orderItem);
                            });
                        });
                    });

                    // Resolve order items promises and assign to order
                    return Promise.all(orderItemsPromises)
                        .then(completedOrderItems => {
                            order.order_items = completedOrderItems;
                            return order;
                        });
                })
                .catch(error => {
                    console.error("Error fetching order items: ", error);
                    reject({ error: "Internal Server Error" });
                });
        });

        // Resolve all order promises
        Promise.all(orderPromises)
            .then(userOrder => {
                return res.status(200).json(userOrder[0]);
            })
            .catch(error => {
                console.error("Error fetching order items: ", error);
                reject({ error: "Internal Server Error" });
            });
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
            const orderPromises = results.rows.map(order => {
                return new Promise((resolve, reject) => {
                    getOrderItemsByOrderIdFunc(order.id, getOrderItemsByOrderId)
                        .then(orderItems => {
                            // Ensure orderItems are not null or undefined
                            if (orderItems && orderItems.length > 0) {
                                // Use map directly on orderItems and assign to orderItemsData
                                const orderItemsData = orderItems.map(orderItem => orderItem);
                                // Assign orderItemsData to order.order_items
                                order.order_items = orderItemsData;
                            } else {
                                // Assign an empty array if no order items are found
                                order.order_items = [];
                            }
                            resolve(order)
                        })
                        .catch(error => reject(error));
                });
            });

            // Ensure orderPromises resolves even if there are no order items
            Promise.all(orderPromises)
                .then(updatedOrder => {
                    res.status(200).json({ message: "Order updated successfully!", order: updatedOrder[0] });
                })
                .catch(error => {
                    console.error("Error fetching order items: ", error);
                    return res.status(500).json({ error: "Internal Server Error" });
                });
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

// A function to get orders by userId
const getOrdersByUserIdFunc = (userId) => {
    return new Promise((resolve, reject) => {
        client.query(getOrdersByUserId, [userId], (error, results) => {
            // Handle query error
            if (error) {
                console.error("Error fetching order by user ID:", error);
                reject({ error: "Internal Server Error" });
            }

            // Map over order results to create promises for fetching order items
            const orderPromises = results.rows.map(order => {
                return getOrderItemsByOrderIdFunc(order.id, getOrderItemsByOrderId)
                    .then(orderItems => {
                        // If no order items, assign empty array to order
                        if (!orderItems || orderItems.length === 0) {
                            order.order_items = [];
                            return order;
                        }

                        // Map over order items to create promises for fetching menu items
                        const orderItemsPromises = orderItems.map(orderItem => {
                            return new Promise((resolve, reject) => {
                                client.query(getMenuItemById, [orderItem.menu_item_id], (error, results) => {
                                    // Handle query error
                                    if (error) {
                                        console.error("Error fetching order item's menu item:", error);
                                        reject({ error: "Internal Server Error" });
                                    }
                                    // If menu item not found, resolve with null (or handle as necessary)
                                    if (results.rows.length === 0) {
                                        console.error("Order item's menu item not found.");
                                        resolve(null);
                                    }
                                    // Assign menu item to order item
                                    orderItem.menu_item = results.rows[0];
                                    resolve(orderItem);
                                });
                            });
                        });

                        // Resolve order items promises and assign to order
                        return Promise.all(orderItemsPromises)
                            .then(completedOrderItems => {
                                order.order_items = completedOrderItems;
                                return order;
                            });
                    })
                    .catch(error => {
                        console.error("Error fetching order items: ", error);
                        reject({ error: "Internal Server Error" });
                    });
            });

            // Resolve all order promises
            Promise.all(orderPromises)
                .then(userOrders => {
                    resolve(userOrders);
                })
                .catch(error => {
                    console.error("Error fetching order items: ", error);
                    reject({ error: "Internal Server Error" });
                });
        });
    });
};


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PRIVATE FUNCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// A function to get order items by order Id
const getOrderItemsByOrderIdFunc = (id, getOrderItemsByOrderId) => {
    return new Promise((resolve, reject) => {
        client.query(getOrderItemsByOrderId, [id], (error, results) => {
            if (error) {
                console.error("Error fetching order items:", error);
                reject(error);

            } else {
                resolve(results.rows);
            }
        });
    });
};

module.exports = {
    listAll,
    getById,
    save,
    update,
    destroy,
    getOrdersByUserIdFunc
};
