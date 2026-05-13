require('dotenv').config();

const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const salesStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'pratikwear/sales',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'avif'],
        resource_type: 'image'
    }
})

const categoryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'pratikwear/categories',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'avif'],
        resource_type: 'image'
    }
})

const salesUpload = multer({ storage: salesStorage })
const categoryUpload = multer({ storage: categoryStorage })

module.exports = { cloudinary, salesUpload, categoryUpload }