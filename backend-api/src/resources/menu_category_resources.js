// Importing the Database connection
const client = require("../../db");

// Importing all menu category queries
const {
    getAllMenuCategories,
    getMenuCategoryById,
    getMenuCategoryByName,
    addMenuCategory,
    updateMenuCategory,
    deleteMenuCategory
} = require("../queries/menu_category_queries");
const { getMenuItemByCategoryId } = require("../queries/menu_item_queries");

// A function to get all menu categories
const listAll = (req, res) => {
    client.query(getAllMenuCategories, (error, results) => {
        if (error) {
            console.error("Error fetching menu categories:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const menuCategoryPromises = results.rows.map(menuCategory => {
            return new Promise((resolve, reject) => {
                getMenuItemByCategoryIdFunc(menuCategory.id, getMenuItemByCategoryId)
                    .then(menuItems => {
                        // Ensure menuItems is not null or undefined
                        if (menuItems && menuItems.length > 0) {
                            // Use map directly on menuItems and assign to menuItemsData
                            const menuItemsData = menuItems.map(menuItem => menuItem);
                            // Assign menuItemsData to menu_category.menu_items
                            menuCategory.menu_items = menuItemsData;
                        } else {
                            // Assign an empty array if no menu items found
                            menuCategory.menu_items = [];
                        }
                        resolve(menuCategory);
                    })
                    .catch(error => reject(error));
            });
        });

        // Ensure menuCategoryPromises resolves even if there are no menu items
        Promise.all(menuCategoryPromises)
            .then(allMenuCategories => {
                res.status(200).json(allMenuCategories);
            })
            .catch(error => {
                console.error("Error fetching menu category items: ", error);
                return res.status(500).json({ error: "Internal Server Error" });
            });
    });
};


// A function to get a menu category by ID
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    // Using database connection to query the DB
    client.query(getMenuCategoryById, [id], (error, results) => {
        if (error) {
            console.error("Error fetching menu category:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // If Menu category doesn't exist
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Menu category not found." });
        }
        res.status(200).json(results.rows[0]);
    });
};

// A function to add a menu category to the database
const save = (req, res) => {
    const { name, description } = req.body;
    // Check if menu category exists
    client.query(getMenuCategoryByName, [name], (error, results) => {
        if (error) {
            console.error("Error checking if menu category exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // If menu category  exists
        if (results.rows.length > 0) {
            return res.status(409).json({ error: "Menu category already exists." });
        }
        // Creating new menu category
        client.query(addMenuCategory, [name, description], (error, results) => {
            if (error) {
                console.error("Error saving menu category:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(201).json({ message: "Menu category created successfully!", menuCategory: results.rows[0] });
        });
    })

};

// A function to update a menu category
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    // Checking if menu category exists
    client.query(getMenuCategoryById, [id], (error, results) => {
        if (error) {
            console.error("Error checking menu category exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // If the menu category doesn't exist
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Menu category not found." });
        }
        // Update the existing menu category
        client.query(updateMenuCategory, [name, description, id], (error, results) => {
            if (error) {
                console.error("Error updating menu category:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json({ message: "Menu category updated successfully", menuCategory: results.rows[0] });
        });
    });
};

// A function to delete a menu category
const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    // Checking if menu category exists
    client.query(getMenuCategoryById, [id], (error, results) => {
        if (error) {
            console.error("Error checking menu category exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // If the menu category doesn't exist
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Menu category not found." });
        }
        // Delete existing menu category
        client.query(deleteMenuCategory, [id], (error, results) => {
            if (error) {
                console.error("Error deleting menu category:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json({ message: "Menu category deleted successfully" });
        });
    });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PRIVATE FUNCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// A function to get a Menu item by menu category Id
const getMenuItemByCategoryIdFunc = (id, getMenuItemByCategoryId) => {
    return new Promise((resolve, reject) => {
        client.query(getMenuItemByCategoryId, [id], (error, results) => {
            if (error) {
                console.error("Error fetching menu item:", error);
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
    destroy
};
