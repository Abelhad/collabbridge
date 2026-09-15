const bcrypt = require('bcrypt');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

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

const login = async(req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        )

        if(result.rows.length === 0){
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordMatch){
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        
    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}
module.exports = { register, login };