const pool = require('../config/db');

const createCampaign = async (req, res) => {
    try{
        const businessId = req.user.id;

        if (req.user.role !== 'business') {
            return res.status(403).json({
                message: 'Only businesses can create campaigns'
            });
        }

        const profile = await pool.query(
            `SELECT id FROM business_profiles WHERE user_id = $1`,
            [businessId]
        );

        if(profile.rows.length === 0){
            return res.status(400).json({
                message: 'You must create a business profile before creating a campaign'
            });
        }

        const {
            title,
            description,
            location,
            budget,
            deadline
        } = req.body;
        
        if(!title || !description){
            return res.status(400).json({
                message: 'Title and description are required'
            });
        }

        const result = await pool.query(
            `INSERT INTO CAMPAIGNS (
                business_id,
                title,
                description,
                location,
                budget,
                deadline
            ) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                businessId,
                title,
                description,
                location,
                budget,
                deadline
            ]
        );

        res.status(201).json({
            message: 'Campaign created successfully',
            campaign: result.rows[0]
        });

    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

const getCampaigns = async (req, res) => {
    try{

        const result = await pool.query(
            `SELECT * FROM campaigns ORDER BY created_at DESC`
        );

        res.json({
            campaigns: result.rows
        })

    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

const getCampaignById = async (req, res) => {
    try{
        const campaignId = req.params.id;
        
        const result = await pool.query(
            `SELECT * FROM campaigns WHERE id = $1`,
            [campaignId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Campaign not found'
            });
        }

        res.json({
            campaign : result.rows[0]
        });

    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

const updateCampaign = async (req, res) => {
    try{
        const campaignId = req.params.id;
        const businessId = req.user.id;

        if(req.user.role !== 'business'){
            return res.status(403).json({
                message: 'Only businesses can update campaigns'
            });
        }

        const {
            title,
            description,
            location,
            budget,
            deadline
        } = req.body;

        const result = await pool.query(
            `UPDATE campaigns
            SET 
                title = $1,
                description = $2,
                location = $3,
                budget = $4,
                deadline = $5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6 
            AND business_id = $7
            RETURNING *`,
            [
                title,
                description,
                location,
                budget,
                deadline,
                campaignId,
                businessId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Campaign not found or you do not own this campaign'
            });
        }

        res.json({
            message: 'Campaign updated successfully',
            campaign: result.rows[0]
        });

    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

const deleteCampaign = async (req, res) => {
    try{
        const campaignId = req.params.id;
        const businessId = req.user.id;

        if(req.user.role !== 'business'){
            return res.status(403).json({
                message: 'Only businesses can delete campaigns'
            });
        }

        const result = await pool.query(
            `DELETE FROM campaigns WHERE id = $1 AND business_id = $2 RETURNING *`,
            [campaignId, businessId]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: 'Campaign not found or you do not own this campaign'
            })
        }

        res.json({
            message: 'Campaign deleted successfully'
        });

    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

module.exports = { createCampaign, getCampaigns, getCampaignById, updateCampaign, deleteCampaign };