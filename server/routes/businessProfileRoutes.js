const express = require('express');
const { 
    createBusinessProfile, 
    getMyBusinessProfile, 
    updateMyBusinessProfile,
    deleteMyBusinessProfile 
} = require('../controllers/businessProfileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBusinessProfile);
router.get('/me', authMiddleware, getMyBusinessProfile);
router.put('/me', authMiddleware, updateMyBusinessProfile);
router.delete('/me', authMiddleware, deleteMyBusinessProfile);

module.exports = router;