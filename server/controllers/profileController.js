const pool = require('../config/db');

const createProfile = async (req, res)=>{
    try{
        const {
            bio,
            location,
            instagram,
            instagram_followers,
            tiktok,
            tiktok_followers,
            niche
        } = req.body;

        const userId = req.user.id;
        const existingProfile = await pool.query(
            `SELECT id FROM profiles WHERE user_id = $1`,
            [userId]
        );

        if(existingProfile.rows.length > 0){
            return res.status(409).json({
                message: 'Profile already exists'
            });
        }

        const result = await pool.query(
            `INSERT INTO profiles (
                user_id,
                bio,
                location,
                instagram,
                instagram_followers,
                tiktok,
                tiktok_followers,
                niche
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [
                userId,
                bio,
                location,
                instagram,
                instagram_followers,
                tiktok,
                tiktok_followers,
                niche
            ]
        );

        res.status(201).json({
            message: 'Profile created successfully',
            profile: result.rows[0]
        });

    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

module.exports = { createProfile };