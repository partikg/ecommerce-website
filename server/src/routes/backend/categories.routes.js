const express = require('express');
const route = express.Router();
const cateorycontroller = require('../../controller/backend/categories.controller')
const upload = require('../../middleware/upload');

module.exports = app => {
    route.post('/add', upload.single('image'), cateorycontroller.create);
    route.post('/view', cateorycontroller.view);
    route.put('/delete', cateorycontroller.delete);
    route.put('/update/:id', upload.single('image'), cateorycontroller.update);
    route.put('/change-status', cateorycontroller.changestatus);
    route.put('/multi-delete', cateorycontroller.multidelete);
    route.post('/details/:id', cateorycontroller.details);

    app.use('/api/backend/categories', route);
}
