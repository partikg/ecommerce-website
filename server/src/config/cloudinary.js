require('dotenv').config();

const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'sales',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        resource_type: 'image'
    }
})

const upload = multer({ storage })

module.exports = { cloudinary, upload }