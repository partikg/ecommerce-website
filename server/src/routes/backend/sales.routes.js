const express = require('express');
const route = express.Router();
const salescontroller = require('../../controller/backend/sales.controller')
const upload = require('../../middleware/upload');

module.exports = app => {
    route.post('/add', upload.array('images', 5), salescontroller.create);
    route.post('/view', salescontroller.view);
    route.put('/delete', salescontroller.delete);
    route.put('/update/:id', upload.array('images', 5), salescontroller.update);
    route.put('/change-status', salescontroller.changestatus);
    route.put('/multi-delete', salescontroller.multidelete);
    route.post('/details/:id', salescontroller.details);

    app.use('/api/backend/sales', route);
}
