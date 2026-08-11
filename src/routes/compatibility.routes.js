const express = require('express');
const router = express.Router();
const compatibilityController = require('../controllers/compatibility.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/check', authMiddleware, compatibilityController.checkCompatibility);

module.exports = router;