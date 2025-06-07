// Routes for /register, /login, and /profile with validation

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

// Q24: Validation for /register
const registerValidation = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
];

// Register
router.post('/register', registerValidation, authController.register);

// Login
router.post('/login', authController.login);

// Protected profile route
router.get('/profile', authMiddleware, authController.profile);

module.exports = router;
