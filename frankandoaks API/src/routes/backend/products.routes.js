const express = require('express');
const route = express.Router();
const productcontroller = require('../../controller/backend/products.controller')
const multer = require('multer')
const uploads = multer({ dest: 'uploads/products' })
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products')
    },
    filename: function (req, file, cb) {
        console.log(path.extname(file.originalname));
        cb(null, 'products-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage }).single('image');


module.exports = app => {
    route.post('/add', upload, productcontroller.create);
    route.post('/view', uploads.none(), productcontroller.view);
    route.put('/delete', uploads.none(), productcontroller.delete);
    route.put('/update/:id', upload, productcontroller.update);
    route.put('/change-status', uploads.none(), productcontroller.changestatus);
    route.put('/multi-delete', uploads.none(), productcontroller.multidelete);
    route.post('/details/:id', uploads.none(), productcontroller.details);

    app.use('/api/backend/products', route);
}
