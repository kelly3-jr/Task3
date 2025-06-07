
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsync = require('../middlewares/catchAsync');
const { validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Register user (hash password)
exports.register = catchAsync(async (req, res) => {
  //24.  Validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: 'Email already registered' });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully', userId: user._id });
});

// 22. Login user (check credentials, return JWT)
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// 23. Protected profile route (validate JWT)
exports.profile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});
