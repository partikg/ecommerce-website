const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/profile', userController.profile);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.put('/multi-delete', userController.multiDeleteUsers);
router.put('/:id', userController.updateUser);

module.exports = router;