const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { 
    createApplication, 
    getMyApplications, 
    getCampaignApplications, 
    updateApplicationStatus 
} = require('../controllers/applicationController');

router.post('/', authMiddleware, createApplication);
router.get('/me', authMiddleware, getMyApplications);
router.get('/campaign/:id', authMiddleware, getCampaignApplications);
router.put('/:id/status', authMiddleware, updateApplicationStatus);

module.exports = router;