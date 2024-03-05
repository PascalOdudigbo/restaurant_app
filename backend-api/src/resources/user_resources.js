// Import the database connection
const client = require("../../db");

// Importing bcrypt
const bcrypt = require('bcrypt');

// Importing the user queries
const {
    getAllUsers,
    getUserById,
    getUserByEmail,
    checkUserExists,
    addUser,
    updateUser,
    deleteUser
} = require("../queries/user_queries");

// Importing the util functions
const { capitalize } = require("../utils/resource_utils");

// Importing JWT for user login and authentication
const jwt = require('jsonwebtoken');

// initializing JWT secretKey variable
const secretKey = process.env.SESSION_SECRET_KEY;

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

// A function to login user
const login = (req, res) => {
    // Destructuring the request and getting the email and password from the 
    const { email, password } = req.body
    // Checking to see if user exists
    client.query(checkUserExists, [email], (error, results) => {
        if (error) {
            console.error("Error checking user exists: ", error)
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Invalid email or password!" })
        }

        // Storing user data from the request
        const user = results.rows[0]

        // Using Bcrypt to compare the login password and the user password
        bcrypt.compare(password, user.password, (compareError, isMatch) => {
            if (compareError) {
                console.error("Error comparing passwords:", compareError);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (!isMatch) {
                return res.status(401).json({ error: "Invalid email or password!" });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '5h' });
            // Login successfully since the password matches
            res.status(200).json({ message: "Login successful!", user: token });

        })

    })
}

// A function to verify user login status
const loggedIn = (req, res) => {
    // Check if user session doesn't exist
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

// A function to get a user by email
const getByEmail = (req, res) => {
    // Getting the user email from the request body
    const { email } = req.body

    // Check if user exists
    client.query(getUserByEmail, [email], (error, results) => {
        // If an error occurs 
        if (error) {
            console.error("Recover user account error: ", error)
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // If the user doesn't exist
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Invalid email!" });
        }
        else {
            // Storing user data from the request
            const user = results.rows[0];
            return res.status(200).json({ message: "Account found!", user: user });
        }
    })
}

module.exports = {
    listAll,
    getById,
    getByEmail,
    save,
    update,
    destroy,
    login,
    loggedIn
};
