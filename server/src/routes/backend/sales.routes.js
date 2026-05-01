const express = require('express');
const route = express.Router();
const salescontroller = require('../../controller/backend/sales.controller')
const multer = require('multer')
const uploads = multer({ dest: 'uploads/sales' })
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/sales')
    },
    filename: function (req, file, cb) {
        console.log(path.extname(file.originalname));
        cb(null, 'sales-' + Date.now() + path.extname(file.originalname))
    }
})
// const upload = multer({ storage: storage }).single('image');
const upload = multer({ storage: storage }).array('images');

module.exports = app => {
    route.post('/add', upload, salescontroller.create);

    route.post('/view', uploads.none(), salescontroller.view);
    route.put('/delete', uploads.none(), salescontroller.delete);
    route.put('/update/:id', upload, salescontroller.update);
    route.put('/change-status', uploads.none(), salescontroller.changestatus);
    route.put('/multi-delete', uploads.none(), salescontroller.multidelete);
    route.post('/details/:id', uploads.none(), salescontroller.details);

    app.use('/api/backend/sales', route);
}
