const getAllMenuItems = "SELECT * FROM menu_items";
const getMenuItemById = "SELECT * FROM menu_items WHERE id = $1";
const addMenuItem = "INSERT INTO menu_items (menu_category_id, name, description, price, image, image_public_id, is_available) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
const updateMenuItem = "UPDATE menu_items SET menu_category_id = COALESCE($1, menu_category_id), name = COALESCE($2, name), description = COALESCE($3, description), price = COALESCE($4, price), image = COALESCE($5, image), image_public_id = COALESCE($6, image_public_id), is_available = COALESCE($7, is_available) WHERE id = $8 RETURNING *";
const deleteMenuItem = "DELETE FROM menu_items WHERE id = $1";

module.exports = {
    getAllMenuItems,
    getMenuItemById,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
}