const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const { categoryUpload } = require('../config/cloudinary');

router.post('/add', categoryUpload.array('images', 5), categoryController.create);
router.post('/view', categoryController.view);
router.put('/delete', categoryController.delete);
router.put('/update/:id', categoryUpload.array('images', 5), categoryController.update);
router.put('/change-status', categoryController.changestatus);
router.put('/multi-delete', categoryController.multidelete);
router.post('/details/:id', categoryController.details);

module.exports = router;