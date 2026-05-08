const express = require('express');
const route = express.Router();
const cateorycontroller = require('../controllers/categoryController')
const { upload } = require('../config/cloudinary')

module.exports = app => {
    route.post('/add', upload.array('images', 5), cateorycontroller.create);
    route.post('/view', cateorycontroller.view);
    route.put('/delete', cateorycontroller.delete);
    route.put('/update/:id', upload.array('images', 5), cateorycontroller.update);
    route.put('/change-status', cateorycontroller.changestatus);
    route.put('/multi-delete', cateorycontroller.multidelete);
    route.post('/details/:id', cateorycontroller.details);

    app.use('/api/backend/categories', route);
}
