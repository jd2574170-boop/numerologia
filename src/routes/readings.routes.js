const express = require('express');
const router = express.Router();
const readingsController = require('../controllers/readings.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/generate', authMiddleware, readingsController.generateReading);
router.get('/history', authMiddleware, readingsController.getHistory);

module.exports = router;