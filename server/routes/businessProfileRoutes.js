const express = require('express');
const { 
    createBusinessProfile, 
    getMyBusinessProfile, 
    updateMyBusinessProfile,
    deleteMyBusinessProfile,
    getCreatorProfile
} = require('../controllers/businessProfileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBusinessProfile);
router.get('/me', authMiddleware, getMyBusinessProfile);
router.get('/creator/:id', authMiddleware, getCreatorProfile);
router.put('/me', authMiddleware, updateMyBusinessProfile);
router.delete('/me', authMiddleware, deleteMyBusinessProfile);

module.exports = router;