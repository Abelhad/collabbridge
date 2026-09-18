const pool = require('../config/db');

const createBusinessProfile = async (req, res) =>{
    try{
        const {
            business_name,
            description,
            location,
            website,
            instagram,
            industry
        } = req.body;
        
        const userId = req.user.id;

        const existingProfile = await pool.query(
            `SELECT * FROM business_profiles WHERE user_id = $1`,
            [userId]
        );

        if(existingProfile.rows.length > 0){
            return res.status(409).json({
                message: 'Business profile already exists'
            });
        }

        const result = await pool.query(
            `INSERT INTO business_profiles (
                user_id,
                business_name,
                description,
                location,
                website,
                instagram,
                industry
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                userId,
                business_name,
                description,
                location,
                website,
                instagram,
                industry
            ]
        );

        res.status(201).json({
            message: 'Business profile created successfully',
            profile: result.rows[0]
        });

    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

const getMyBusinessProfile = async (req, res) => {
    try{
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT * FROM business_profiles WHERE user_id = $1`,
            [userId]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: 'Business profile not found'
            });
        }

        res.json({
            profile: result.rows[0]
        });

    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

module.exports = { createBusinessProfile, getMyBusinessProfile };