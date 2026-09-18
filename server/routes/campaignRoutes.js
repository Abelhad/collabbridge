const express = require('express');
const router = express.Router();
const { 
    createCampaign, 
    getCampaigns, 
    getCampaignById, 
    updateCampaign,
    deleteCampaign
} = require('../controllers/campaignController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createCampaign);
router.get('/', authMiddleware, getCampaigns);
router.get('/:id', authMiddleware, getCampaignById);
router.put('/:id', authMiddleware, updateCampaign);
router.delete('/:id', authMiddleware, deleteCampaign);

module.exports = router;