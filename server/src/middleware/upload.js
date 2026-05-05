const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'categories',
        allowed_formats: ['jpg', 'png', 'jpeg', 'avif', 'webp'],
    },
});

const upload = multer({ storage });

module.exports = upload;