const express = require('express');
const router = express.Router();
const numerologyController = require('../controllers/numerology.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/calculate', authMiddleware, numerologyController.calculateProfile);
router.get('/profile', authMiddleware, numerologyController.getProfile);

module.exports = router;