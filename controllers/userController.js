
const User = require('../models/User');
const catchAsync = require('../middlewares/catchAsync');

// Q13: Create new user
exports.createUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.status(201).json(user);
});

// Q14: Get all users (pagination & search will be added in Q26-27)
exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Q15: Get user by ID
exports.getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// q16: Update user's email
exports.updateUserEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { email },
    { new: true, runValidators: true }
  );
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Q17: Delete user
exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted successfully' });
});

// Q26 Enhanced getUsers with pagination and search

exports.getUsers = catchAsync(async (req, res) => {
  let { page = 1, limit = 5, search = '' } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);
  const query = search
    ? { name: { $regex: search, $options: 'i' } } 
    : {};

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    users,
  });
});
