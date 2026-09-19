const pool = require('../config/db');

const createApplication = async (req, res) => {
    try{
        const creatorId = req.user.id;
        
        if(req.user.role !== 'creator'){
            return res.status(403).json({
                message: 'Only creators can apply to campaigns'
            });
        }

        const {
            campaign_id,
            message
        } = req.body;

        if(!campaign_id){
            return res.status(400).json({
                message: 'Campaign ID is required'
            });
        }

        const campaign = await pool.query(
            `SELECT id FROM campaigns WHERE id = $1`,
            [campaign_id]
        );

        if(campaign.rows.length === 0){
            return res.status(404).json({
                message: 'Campaign not found'
            });
        }

        const existingApplication = await pool.query(
            `SELECT id FROM applications WHERE creator_id = $1 AND campaign_id = $2`,
            [creatorId, campaign_id]
        );

        if(existingApplication.rows.length > 0){
            return res.status(409).json({
                message: 'You already applied to this campaign'
            });
        }

        const result = await pool.query(
            `INSERT INTO applications (
                creator_id,
                campaign_id,
                message
            ) VALUES ($1, $2, $3) 
            RETURNING *`,
            [
                creatorId,
                campaign_id,
                message
            ]
        );

        res.json({
            message: 'Application submitted successfully',
            application: result.rows[0]
        });

    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

const getMyApplications = async (req, res) => {
    try{
        const creatorId = req.user.id;

        if(req.user.role !== 'creator'){
            return res.status(403).json({
                message: 'Only creators can view their applications'
            });
        }

        const result = await pool.query(
            `SELECT 
                applications.id,
                applications.status,
                applications.message,
                applications.created_at,
                campaigns.id AS campaign_id,
                campaigns.title,
                campaigns.description,
                campaigns.location,
                campaigns.budget,
                campaigns.deadline
            FROM applications
            JOIN campaigns
            ON applications.campaign_id = campaigns.id
            WHERE applications.creator_id = $1
            ORDER BY applications.created_at DESC`,
            [creatorId]
        );

        res.json({
            applications: result.rows
        });

    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

const getCampaignApplications = async (req, res) => {
    try{
        const businessId = req.user.id;
        const campaignId = req.params.id;

        if (req.user.role !== 'business') {
            return res.status(403).json({
                message: 'Only businesses can view campaign applications'
            });
        }

        const campaign = await pool.query(
            `SELECT id FROM campaigns WHERE id = $1 AND business_id = $2`,
            [campaignId, businessId]
        );

        if (campaign.rows.length === 0) {
            return res.status(404).json({
                message: 'Campaign not found or you do not own this campaign'
            });
        }

        const result = await pool.query(
            `SELECT 
                applications.id,
                applications.status,
                applications.message,
                applications.created_at,
                users.id AS creator_id,
                users.name AS creator_name,
                profiles.bio,
                profiles.location,
                profiles.instagram,
                profiles.instagram_followers,
                profiles.tiktok,
                profiles.tiktok_followers,
                profiles.niche
            FROM applications 
            JOIN users 
            ON applications.creator_id = users.id
            LEFT JOIN profiles 
            ON profiles.user_id = users.id
            WHERE applications.campaign_id = $1
            ORDER BY applications.created_at DESC`,
            [campaignId]
        );

        res.json({
            applications: result.rows
        });

    }catch(error) {
        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
}

const updateApplicationStatus = async (req, res) => {
    try{
        const businessId = req.user.id;
        const applicationId = req.params.id;
        const { status } = req.body;

        if(req.user.role !== 'business'){
            return res.status(403).json({
                message: 'Only businesses can update application status'
            })
        }

        if(!['rejected', 'accepted'].includes(status)){
            return res.status(400).json({
                message: 'Status must be accepted or rejected'
            });
        }

        const result = await pool.query(
            `UPDATE applications
            SET 
                status = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            AND campaign_id IN (
                SELECT id FROM campaigns
                WHERE business_id = $3
            )
            RETURNING *`,
            [status, applicationId, businessId]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: 'Application not found or you do not own this campaign'
            });
        }

        res.json({
            message: `Application ${status} successfully`,
            application: result.rows[0]
        });

    }catch(error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

module.exports = { createApplication, getMyApplications, getCampaignApplications, updateApplicationStatus };