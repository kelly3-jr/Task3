
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 13.POST /users - create user
router.post('/', userController.createUser);

// 14.GET /users - get all users
router.get('/', userController.getUsers);

//15. GET /users/:id - get user by ID
router.get('/:id', userController.getUserById);

//16 PUT /users/:id - update user's email
router.put('/:id', userController.updateUserEmail);

//17 DELETE /users/:id - delete user
router.delete('/:id', userController.deleteUser);

router.get('/', userController.getUsers);

module.exports = router;
