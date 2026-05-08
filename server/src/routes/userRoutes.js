const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/userController');

router.post('/register', usercontroller.register);
router.post('/login', usercontroller.login);
router.post('/profile', usercontroller.profile);
router.get('/', usercontroller.getUsers);
router.get('/:id', usercontroller.getUserById);
router.delete('/:id', usercontroller.deleteUser);

module.exports = router;