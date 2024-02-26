const getAllOrderItems = "SELECT * FROM order_items";
const getOrderItemById = "SELECT * FROM order_items WHERE id = $1";
const addOrderItem = "INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3) RETURNING *";
const updateOrderItem = "UPDATE order_items SET order_id = COALESCE($1, order_id), menu_item_id = COALESCE($2, menu_item_id), quantity = COALESCE($3, quantity) WHERE id = $4 RETURNING *";
const deleteOrderItem = "DELETE FROM order_items WHERE id = $1";