const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns } = require('../controllers/campaignController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createCampaign);
router.get('/', authMiddleware, getCampaigns);

module.exports = router;