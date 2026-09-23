const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const pool = require('../config/db');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, async (req, res) =>{
    try{
        const result = await pool.query(
            'SELECT id, name, email, role FROM users WHERE id = $1',
            [req.user.id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.json({
            message: 'You are authenticated',
            user: result.rows[0]
        });
    }catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Server error'
        })
    }
})
router.post('/logout', logout);

module.exports = router;