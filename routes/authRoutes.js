const express = require('express');
const router = express.Router();
const { apiSuccessResponse, apiErrorResponse } = require('../utils/responseHelper');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Mock user data (replace with actual database logic)
const users = [
    {
        id: 1,
        username: 'testuser',
        password: '$2a$10$RbU5YY9/M4mEaifBTK/z1elH1rvkLjzx23N1prq0mH2H5l15F1P5u', // Hashed password for "password"
    }
];

// Login route
router.post('/login', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
    // Validate input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return apiErrorResponse(res, 'Validation Error', errors.array(), 400);
    }

    const { username, password } = req.body;

    // Find user by username (replace with database lookup)
    const user = users.find(u => u.username === username);
    if (!user) {
        return apiErrorResponse(res, 'Invalid Credentials', 'Username or password is incorrect', 401);
    }

    // Compare password using bcryptjs
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return apiErrorResponse(res, 'Invalid Credentials', 'Username or password is incorrect', 401);
    }

    // If credentials are valid, create and send JWT token
    const payload = {
        user: {
            id: user.id,
            username: user.username
        }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            console.error(err.message);
            apiErrorResponse(res, 'JWT Error', 'Failed to create JWT token', 500);
        } else {
            apiSuccessResponse(res, 'Login Successful', { token }, 200);
        }
    });
});

module.exports = router;
