const express = require('express');
const route = express.Router();
const cateorycontroller = require('../../controller/backend/categories.controller')
const multer = require('multer')
const uploads = multer({ dest: 'uploads/categories' })
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/categories')
    },
    filename: function (req, file, cb) {
        console.log(path.extname(file.originalname));
        cb(null, 'categories-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage }).single('image');


module.exports = app => {
    route.post('/add', upload, cateorycontroller.create);
    route.post('/view', uploads.none(), cateorycontroller.view);
    route.put('/delete', uploads.none(), cateorycontroller.delete);
    route.put('/update/:id', upload, cateorycontroller.update);
    route.put('/change-status', uploads.none(), cateorycontroller.changestatus);
    route.put('/multi-delete', uploads.none(), cateorycontroller.multidelete);
    route.post('/details/:id', uploads.none(), cateorycontroller.details);

    app.use('/api/backend/categories', route);
}
