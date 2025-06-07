//20. store uploaded image metadata in mongodb

const Image = require('../models/Image');
const catchAsync = require('../middlewares/catchAsync');

exports.uploadImage = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Save metadata in DB
  const image = await Image.create({
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });

  res.status(201).json({ message: 'File uploaded successfully', image });
});
