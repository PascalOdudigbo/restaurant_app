const getAllMenuCategories = "SELECT * FROM menu_categories";
const getMenuCategoryById = "SELECT * FROM menu_categories WHERE id = $1";
const addMenuCategory = "INSERT INTO menu_categories (name, description) VALUES ($1, $2) RETURNING *";
const updateMenuCategory = "UPDATE menu_categories SET name = COALESCE($1, name), description = COALESCE($2, description) WHERE id = $3 RETURNING *";
const deleteMenuCategory = "DELETE FROM menu_categories WHERE id = $1";
