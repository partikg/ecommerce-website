const express = require('express');
const route = express.Router();
const usercontroller = require('../../controller/frontend/user.controller')
const multer = require('multer')
const uploads = multer({ dest: 'uploads/user' })
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/user')
    },
    filename: function (req, file, cb) {
        console.log(path.extname(file.originalname));
        cb(null, 'user-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage }).single('image');


module.exports = app => {
    route.post('/send-mail', uploads.none(), usercontroller.sendmail);
    route.post('/register', upload, usercontroller.register);
    route.post('/login', uploads.none(), usercontroller.login);
    route.post('/profile', uploads.none(), usercontroller.profile);

    route.post('/viewuser', uploads.none(), usercontroller.viewuser);
    route.post('/deleteuser', uploads.none(), usercontroller.deleteuser);

    app.use('/api/frontend/user', route);
}


