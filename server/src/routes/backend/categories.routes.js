const express = require('express');
const route = express.Router();
const cateorycontroller = require('../../controller/backend/categories.controller')
const upload = require('../../middleware/upload');

module.exports = app => {
    route.post('/add', upload.single('image'), cateorycontroller.create);
    route.post('/view', uploads.none(), cateorycontroller.view);
    route.put('/delete', uploads.none(), cateorycontroller.delete);
    route.put('/update/:id', upload.single('image'), cateorycontroller.update);
    route.put('/change-status', uploads.none(), cateorycontroller.changestatus);
    route.put('/multi-delete', uploads.none(), cateorycontroller.multidelete);
    route.post('/details/:id', uploads.none(), cateorycontroller.details);

    app.use('/api/backend/categories', route);
}
