// Importing the Database connection
const client = require("../../db");

// Importing all table queries
const {
    getAllTables,
    getTableById,
    getTableByNumber,
    addTable,
    updateTable,
    deleteTable
} = require("../queries/table_queries");

// A function to get all tables
const listAll = (req, res) => {
    client.query(getAllTables, (error, results) => {
        if (error) {
            console.error("Error fetching tables:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(results.rows);
    });
};

// A function to get a table by ID
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getTableById, [id], (error, results) => {
        if (error) {
            console.error("Error fetching table:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Table not found." });
        }
        res.status(200).json(results.rows[0]);
    });
};

// A function to add a table to the database
const save = (req, res) => {
    const { table_number, is_occupied } = req.body;
    // Check if table exists
    client.query(getTableByNumber, [table_number], (error, results) => {
        if(error) {
            console.error("Error checking user existence:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // If table already exists
        if(results.rows.length > 0) {
            return res.status(409).json({ error: "Table already exists." });
        }

        // Create a new restaurant table
        client.query(addTable, [table_number, is_occupied], (error, results) => {
            if (error) {
                console.error("Error saving table:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(201).json(results.rows[0]);
        });
    })
    
};

// A function to update a table
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { table_number, is_occupied } = req.body;
    client.query(getTableById, [id], (error, results) => {
        if (error) {
            console.error("Error checking table exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Table not found." });
        }
        client.query(updateTable, [table_number, is_occupied, id], (error, results) => {
            if (error) {
                console.error("Error updating table:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json({message: "Table updated successfully!", table: results.rows[0]});
        });
    });
};

// A function to delete a table
const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getTableById, [id], (error, results) => {
        if (error) {
            console.error("Error checking table exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Table not found." });
        }
        client.query(deleteTable, [id], (error, results) => {
            if (error) {
                console.error("Error deleting table:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json({message: "Table deleted successfully"});
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
