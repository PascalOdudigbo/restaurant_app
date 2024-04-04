const getAllOrders = "SELECT * FROM orders ORDER BY id DESC";
const getOrderById = "SELECT * FROM orders WHERE id = $1";
const getOrdersByUserId = "SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC";
const checkIfUserHasOpenOrder = "SELECT * FROM orders WHERE user_id = $1 AND status = 'Open' ORDER BY id DESC";
const addOrder = "INSERT INTO orders (user_id, table_id, status) VALUES ($1, $2, $3) RETURNING *";
const updateOrder = "UPDATE orders SET user_id = COALESCE($1, user_id), table_id = COALESCE($2, table_id), status = COALESCE($3, status) WHERE id = $4 RETURNING *";
const deleteOrder = "DELETE FROM orders WHERE id = $1";


module.exports = {
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    checkIfUserHasOpenOrder,
    addOrder,
    updateOrder,
    deleteOrder
}