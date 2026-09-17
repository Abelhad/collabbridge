const express = require('express');
const { createBusinessProfile } = require('../controllers/businessProfileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBusinessProfile);

module.exports = router;