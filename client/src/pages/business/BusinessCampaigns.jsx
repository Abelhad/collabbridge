import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

const BusinessCampaigns = () => {
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

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-CA')
    }

    if (loading) {
        return <p>Loading campaigns...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="business-campaigns">
            <div>
                <h1>My Campaigns</h1>
                <Link to="/business/campaigns/create">
                    Create Campaign
                </Link>
            </div>

            {campaigns.length === 0 ? (
                <p>You don't have any campaigns yet.</p>
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
                                {formatDate(campaign.deadline) || 'Not specified'}
                            </p>

                            <Link to={`/business/campaigns/${campaign.id}/edit`}>
                                Edit
                            </Link>

                            <button>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BusinessCampaigns