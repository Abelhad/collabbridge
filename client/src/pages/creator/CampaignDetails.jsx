import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

const CampaignDetails = () => {
    const { id } = useParams()

    const [campaign, setCampaign] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [applying, setApplying] = useState(false)
    const [applicationMessage, setApplicationMessage] = useState('')

    useEffect(() => {
        const getCampaign = async () => {
            try {
                const response = await api.get(`/campaigns/${id}`)
                setCampaign(response.data.campaign)
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    'Failed to load campaign'
                )
            } finally {
                setLoading(false)
            }
        }

        getCampaign()
    }, [id])

    const handleApply = async () => {
        setApplying(true)
        setApplicationMessage('')

        try {
            await api.post('/applications', {
                campaign_id: campaign.id,
                message
            })

            setApplicationMessage(
                'Application submitted successfully!'
            )
        } catch (error) {
            setApplicationMessage(
                error.response?.data?.message ||
                'Failed to submit application'
            )
        } finally {
            setApplying(false)
        }
    }

    if (loading) {
        return <p>Loading campaign...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!campaign) {
        return <p>Campaign not found.</p>
    }

    return (
        <div className="campaign-details">
            <h1>{campaign.title}</h1>

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

            <h2>Apply for this campaign</h2>

            <textarea
                placeholder="Write a message to the business..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={handleApply} disabled={applying}>
                {applying ? 'Applying...' : 'Apply'}
            </button>

            {applicationMessage && (
                <p>{applicationMessage}</p>
            )}
        </div>
    )
}

export default CampaignDetails