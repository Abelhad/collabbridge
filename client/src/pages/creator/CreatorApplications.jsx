import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

const CreatorApplications = () => {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getApplications = async () => {
            try {
                const response = await api.get('/applications/me')
                setApplications(response.data.applications)
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    'Failed to load applications'
                )
            } finally {
                setLoading(false)
            }
        }

        getApplications()
    }, [])

    if (loading) {
        return <p>Loading applications...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="creator-applications">
            <h1>My Applications</h1>

            {applications.length === 0 ? (
                <p>You haven't applied to any campaigns yet.</p>
            ) : (
                <div>
                    {applications.map((application) => (
                        <div key={application.id}>
                            <h2>{application.title}</h2>

                            <p>
                                <strong>Status:</strong>{' '}
                                {application.status}
                            </p>

                            <p>
                                <strong>Message:</strong>{' '}
                                {application.message || 'No message'}
                            </p>

                            <Link
                                to={`/creator/campaigns/${application.campaign_id}`}
                            >
                                View Campaign
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CreatorApplications