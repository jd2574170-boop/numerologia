const express = require('express');
const router = express.Router();
const { checkCompatibility } = require('../controllers/compatibility.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/check', protect, checkCompatibility);

module.exports = router;