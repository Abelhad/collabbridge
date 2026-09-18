const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns, getCampaignById } = require('../controllers/campaignController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createCampaign);
router.get('/', authMiddleware, getCampaigns);
router.get('/:id', authMiddleware, getCampaignById);

module.exports = router;