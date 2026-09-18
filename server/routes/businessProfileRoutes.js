const express = require('express');
const { createBusinessProfile, getMyBusinessProfile } = require('../controllers/businessProfileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBusinessProfile);
router.get('/me', authMiddleware, getMyBusinessProfile);

module.exports = router;