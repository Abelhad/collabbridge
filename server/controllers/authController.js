const bcrypt = require('bcrypt');
const pool = require('../config/db');

const register = async(req, res) =>{
    try{
        const {name, email, password, role} = req.body;

        if(!name || !email || !password || !role){
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        if(!['creator', 'business'].includes(role)){
            return res.status(400).json({
                message: 'Invalid role'
            });
        }

        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if(existingUser.rows.length > 0){
            return res.status(409).json({
                message: 'Email already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, role, created_at`,
            [name, email, hashedPassword, role]
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: result.rows[0]
        });


    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'server error'
        });
    }
}

module.exports = { register };