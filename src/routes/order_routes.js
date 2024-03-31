const { Router } = require('express')

const router = Router();

// Importing the menu categories controller functions
const {getAllOrders, getOrderById, addOrder, updateOrder, deleteOrder} = require("../controllers/order_controller");

// A route to get all the orders
router.get("/", getAllOrders);

// A router to get order by ID
router.get("/:id", getOrderById);

// A router to add a order to the database
router.post("/", addOrder);

// Router to update order
router.patch("/:id", updateOrder);
router.put("/:id", updateOrder);

// A route to delete user
router.delete("/:id", deleteOrder);

module.exports = router