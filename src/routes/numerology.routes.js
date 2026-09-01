const express = require('express');
const router = express.Router();
const { calculateProfile, getProfile } = require('../controllers/numerology.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/calculate', protect, calculateProfile);
router.get('/profile', protect, getProfile);

module.exports = router;