const express = require('express');
const router = express.Router();

const salesController = require('../controllers/saleController');
const { upload } = require('../config/cloudinary');

router.post('/add', upload.array('images', 5), salesController.create);
router.post('/view', salesController.view);
router.put('/delete', salesController.delete);
router.put('/update/:id', upload.array('images', 5), salesController.update);
router.put('/change-status', salesController.changestatus);
router.put('/multi-delete', salesController.multidelete);
router.post('/details/:id', salesController.details);

module.exports = router;