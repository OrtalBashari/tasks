const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken'); // ייבוא מודול JWT
const { ObjectId } = require('mongodb');

const jwtRoutes = express.Router();

// יצירת טוקן
jwtRoutes.post('/api/set-token', async (req, res) => {
    try {
        const { _id, email, username } = req.body;

        if (!_id || (!email && !username)) {
            return res.status(400).json({ message: "Missing required user information" });
        }

        // יצירת טוקן עם פרטים רלוונטיים בלבד
        const token = jwt.sign({ id: _id, email, username }, process.env.ACCESS_SECRET, {
            expiresIn: '24h'
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error generating token", error: error.message });
    }
});

// פונקציית אימות טוקן
const verifyJWT = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.decoded = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};

// נתיב מוגן לדוגמה
jwtRoutes.get('/api/protected', verifyJWT, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.decoded });
});

module.exports = jwtRoutes;
