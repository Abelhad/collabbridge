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

const getMyProfile = async (req, res)=>{
    try{
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT * FROM profiles WHERE user_id = $1`,
            [userId]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: 'profile not found'
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

const updateMyProfile = async (req, res) =>{
    try{
        const userId = req.user.id;

        const {
            bio,
            location,
            instagram,
            instagram_followers,
            tiktok,
            tiktok_followers,
            niche
        } = req.body;

        const result = await pool.query(
            `UPDATE profiles 
            SET 
                bio = $1,
                location = $2,
                instagram = $3,
                instagram_followers = $4,
                tiktok = $5,
                tiktok_followers = $6,
                niche = $7,
                updated_at = CURRENT_TIMESTAMP
            WHERE user_id = $8
            RETURNING *`,
            [
                bio,
                location,
                instagram,
                instagram_followers,
                tiktok,
                tiktok_followers,
                niche,
                userId
            ]
        )

        if(result.rows.length === 0){
            return res.status(404).json({
                message: 'Profile not found'
            });
        }

        res.json({
            message: 'Profile updated successfully',
            profile: result.rows[0]
        });
    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

module.exports = { createProfile, getMyProfile, updateMyProfile };