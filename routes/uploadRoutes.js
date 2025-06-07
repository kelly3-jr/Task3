// Route for image uploads

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadValidator');
const uploadController = require('../controllers/uploadController');

// POST /upload - single file upload with multer middleware
router.post('/', upload.single('image'), uploadController.uploadImage);

module.exports = router;
