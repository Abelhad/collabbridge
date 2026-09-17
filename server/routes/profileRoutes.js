const express = require('express');

const { createProfile, getMyProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createProfile);
router.get('/me', authMiddleware, getMyProfile);

module.exports = router;