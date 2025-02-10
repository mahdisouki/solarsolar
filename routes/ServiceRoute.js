const express = require('express');
const { createService, getServices, getServiceById ,deleteService } = require('../controllers/ServicesCtrl');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');
const router = express.Router();

// router.post('/', protect, upload.array('images', 5), createService);
router.post('/', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'icon', maxCount: 1 },
    { name: 'images', maxCount: 5 } // Adjust maxCount as necessary
]), createService);router.get('/', getServices);
router.get('/:id', getServiceById);
router.delete('/:id', deleteService);

module.exports = router;

