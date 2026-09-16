const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, (req, res) =>{
    res.json({
        message: 'You are authenticated',
        user: req.user
    });
})
router.post('/logout', logout);

module.exports = router;