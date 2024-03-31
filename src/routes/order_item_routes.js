const { Router } = require('express')

const router = Router();

// Importing the menu categories controller functions
const {getAllOrderItems, getOrderItemById, addOrderItem, updateOrderItem, deleteOrderItem} = require("../controllers/order_item_controller");

// A route to get all the orders
router.get("/", getAllOrderItems);

// A router to get order by ID
router.get("/:id", getOrderItemById);

// A router to add a order to the database
router.post("/", addOrderItem);

// Router to update order
router.patch("/:id", updateOrderItem);
router.put("/:id", updateOrderItem);

// A route to delete user
router.delete("/:id", deleteOrderItem);

module.exports = router