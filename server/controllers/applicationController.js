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

module.exports = { createApplication };