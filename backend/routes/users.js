const express = require('express');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');  // ייבוא של bcrypt
const user = express.Router();

// Create a new user
user.post('/new-user', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await global.usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // הצפנה עם salt של 10 סיבובים

        const newUser = { username, email, password: hashedPassword };
        const result = await global.usersCollection.insertOne(newUser);
        
        res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

user.post('/login', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username && !email || !password) {
            return res.status(400).json({message: "Missing required fields"});
        }
        let query = {};
        if (email) {
            query = {email: email};
        }
        else if (username) {
            query = {username: username};
        }
        const existingUser = await global.usersCollection.findOne(query);

        if (!existingUser) {
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        res.status(200).json({message: 'Login successful', userId: existingUser._id});
    }
    catch (error) {
        res.status(500).json({message: "Error during login", error: error.message});
    }
});





// Get all the users
user.get('/users', async (req, res) => {
    try {
        const result = await global.usersCollection.find({}).toArray();
        res.status(200).json(result); // שינוי מ- send ל- json
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Get user by id
user.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await global.usersCollection.findOne(query);
        
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user by id', error: error.message });
    }
});

// Get user by email
user.get('/user/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email: email };
        const result = await global.usersCollection.findOne(query);
        
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user by email', error: error.message });
    }
});

// Delete a user
user.delete('/delete-user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await global.usersCollection.deleteOne(query);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Update a user
user.put('/update-user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateUser = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: false }; 
        const updateDoc = {
            $set: {
                username: updateUser.username,
                email: updateUser.email,
                role: updateUser.role,
                photoUrl: updateUser.photoUrl,
            }
        };

        const result = await global.usersCollection.updateOne(filter, updateDoc, options);
        
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

module.exports = user;
