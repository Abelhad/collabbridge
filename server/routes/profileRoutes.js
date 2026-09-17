const express = require('express');

const { createProfile, getMyProfile, updateMyProfile, deleteMyProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createProfile);
router.get('/me', authMiddleware, getMyProfile);
router.put('/me', authMiddleware, updateMyProfile);
router.delete('/me', authMiddleware, deleteMyProfile);

module.exports = router;