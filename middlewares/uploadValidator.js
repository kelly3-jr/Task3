// 19. Restrict file types to .jpg, .jpeg, .png only

const multer = require('multer');
const path = require('path');

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Save file with originalname + timestamp for uniqueness
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, baseName + '-' + Date.now() + ext);
  },
});

// File filter for allowed types
function fileFilter(req, file, cb) {
  const allowedTypes = ['.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
  }
}

const upload = multer({ storage, fileFilter });

module.exports = upload;
