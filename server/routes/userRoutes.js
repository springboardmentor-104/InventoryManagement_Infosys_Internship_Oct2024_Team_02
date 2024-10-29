// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Public route (accessible to everyone)
router.get('/public', (req, res) => {
    res.send('This is a public route.');
});

// Customer route (accessible to customers and admins)
router.get('/customer', authenticateToken, authorizeRoles('customer', 'admin'), (req, res) => {
    res.send('Hello, Customer!');
});

// Admin route (accessible only to admins)
router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.send('Welcome, Admin!');
});

module.exports = router;
