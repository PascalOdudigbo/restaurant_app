// Import the database connection
const client = require("../../db");

// Importing bcrypt
const bcrypt = require('bcrypt');

// Importing the user queries
const {
    getAllUsers,
    getUserById,
    checkUserExists,
    addUser,
    updateUser,
    deleteUser
} = require("../queries/user_queries");

// Importing the util functions
const { capitalize } = require("../utils/resource_utils");

// A function to list all users
const listAll = (req, res) => {
    client.query(getAllUsers, (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json(results.rows);
    });
};

// A function to get a user by ID
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getUserById, [id], (error, results) => {
        if (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }
        res.status(200).json(results.rows[0]);
    });
};

// A function to add a user to the database
const save = (req, res) => {
    const { name, mobile_number, postcode, email, password, role } = req.body;
    bcrypt.hash(password, 10, (hashError, hashedPassword) => {
        if (hashError) {
            console.error("Error hashing password:", hashError);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        client.query(checkUserExists, [email], (error, results) => {
            if (error) {
                console.error("Error checking user existence:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            if (results.rows.length > 0) {
                return res.status(409).json({ error: "User already exists." });
            }
            client.query(addUser, [capitalize(name), mobile_number, postcode, email, hashedPassword, role], (error, results) => {
                if (error) {
                    console.error("Error saving user:", error);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                res.status(201).json(results.rows[0]);
            });
        });
    });
};

// A function to update a user if it exists
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, mobile_number, postcode, email, password, role } = req.body;
    bcrypt.hash(password, 10, (error, hashedPassword) => {
        if (error) {
            console.error("Error hashing password: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        client.query(getUserById, [id], (error, results) => {
            if (error) {
                console.error("Error checking user existence:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            if (results.rows.length === 0) {
                return res.status(404).json({ error: "User not found." });
            }
            client.query(updateUser, [capitalize(name), mobile_number, postcode, email, hashedPassword, role, id], (error, results) => {
                if (error) {
                    console.error("Error updating user:", error);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                res.status(200).json(results.rows[0]);
            });
        });
    });
};

// A function to delete a user if it exists
const destroy = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getUserById, [id], (error, results) => {
        if (error) {
            console.error("Error checking user existence:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }
        client.query(deleteUser, [id], (error, results) => {
            if (error) {
                console.error("Error deleting user:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json("User deleted successfully");
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
