const express = require('express');
const route = express.Router();
const womencontroller = require('../../controller/backend/women.controller')
const multer = require('multer')
const uploads = multer({ dest: 'uploads/women' })
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/women')
    },
    filename: function (req, file, cb) {
        console.log(path.extname(file.originalname));
        cb(null, 'women-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage }).single('image');

module.exports = app => {
    route.post('/add', upload, womencontroller.create);
    route.post('/view', uploads.none(), womencontroller.view);
    route.put('/delete', uploads.none(), womencontroller.delete);
    route.put('/update/:id', upload, womencontroller.update);
    route.put('/change-status', uploads.none(), womencontroller.changestatus);
    route.put('/multi-delete', uploads.none(), womencontroller.multidelete);
    route.post('/details/:id', uploads.none(), womencontroller.details);

    app.use('/api/backend/women', route);
}
