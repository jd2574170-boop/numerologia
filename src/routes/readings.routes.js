const express = require('express');
const router = express.Router();
const { generateReading, getHistory } = require('../controllers/readings.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/generate', protect, generateReading);
router.get('/history', protect, getHistory);

module.exports = router;