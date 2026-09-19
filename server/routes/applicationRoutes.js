const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createApplication, getMyApplications } = require('../controllers/applicationController');

router.post('/', authMiddleware, createApplication);
router.get('/me', authMiddleware, getMyApplications);

module.exports = router;