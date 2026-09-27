import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

const CreatorCampaigns = () => {
    const [campaigns, setCampaigns] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getCampaigns = async () => {
            try {
                const response = await api.get('/campaigns')
                setCampaigns(response.data.campaigns)
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    'Failed to load campaigns'
                )
            } finally {
                setLoading(false)
            }
        }

        getCampaigns()
    }, [])

    if (loading) {
        return <p>Loading campaigns...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="creator-campaigns">
            <h1>Find Campaigns</h1>

            {campaigns.length === 0 ? (
                <p>No campaigns available.</p>
            ) : (
                <div>
                    {campaigns.map((campaign) => (
                        <div key={campaign.id}>
                            <h2>{campaign.title}</h2>

                            <p>{campaign.description}</p>

                            <p>
                                <strong>Location:</strong>{' '}
                                {campaign.location || 'Not specified'}
                            </p>

                            <p>
                                <strong>Budget:</strong>{' '}
                                {campaign.budget || 'Not specified'}
                            </p>

                            <p>
                                <strong>Deadline:</strong>{' '}
                                {campaign.deadline || 'Not specified'}
                            </p>

                            <Link to={`/creator/campaigns/${campaign.id}`}>
                                View Campaign
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CreatorCampaigns