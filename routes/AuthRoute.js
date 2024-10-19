const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/AuthCtrl');
const { protect } = require('../middlewares/authMiddleware');
const { changePassword, changeEmail } = require('../controllers/AdminCtrl');
const router = express.Router();

router.post('/register', registerAdmin);

router.post('/login', loginAdmin);
router.post('/change-password', protect, changePassword);
router.post('/change-email', protect, changeEmail);

module.exports = router;
