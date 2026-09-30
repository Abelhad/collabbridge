import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import api from '../../services/api'

const BusinessApplications = () => {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getApplications = async () => {
            try {
                const response = await api.get('/applications/business')
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

    const handleStatusChange = async (applicationId, status) => {
        try {
            await api.put(`/applications/${applicationId}/status`, {
                status
            })

            setApplications((currentApplications) =>
                currentApplications.map((application) =>
                    application.id === applicationId
                        ? { ...application, status }
                        : application
                )
            )
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) {
        return <p>Loading applications...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="business-applications">

            <div className="page-header">
                <h1>Applications</h1>
                <p>
                    Review creator applications and manage your campaign opportunities.
                </p>
            </div>

            {applications.length === 0 ? (
                <p className="applications-empty">
                    You haven't received any applications yet.
                </p>
            ) : (
                <div className="applications-list">
                    {applications.map((application) => (
                        <div
                            className="application-card"
                            key={application.id}
                        >
                            <h2>{application.creator_name}</h2>

                            <p className="application-social">
                                <FaInstagram />{' '}
                                {application.instagram || 'Not specified'}{' '}
                                {application.instagram_followers
                                    ? `(${application.instagram_followers} followers)`
                                    : ''}
                            </p>

                            <p className="application-social">
                                <FaTiktok />{' '}
                                {application.tiktok || 'Not specified'}{' '}
                                {application.tiktok_followers
                                    ? `(${application.tiktok_followers} followers)`
                                    : ''}
                            </p>

                            <Link
                                className="profile-details-link"
                                to={`/business/creators/${application.creator_id}`}
                            >
                                Profile Details
                            </Link>

                            <p className="application-campaign">
                                <strong>Campaign:</strong>{' '}
                                {application.campaign_title}
                            </p>

                            <p className="application-status">
                                <strong>Status:</strong>{' '}
                                {application.status}
                            </p>

                            <p className="application-message">
                                <strong>Message:</strong>{' '}
                                {application.message || 'No message'}
                            </p>

                            <div className="application-actions">
                                <button
                                    className="accept-button"
                                    onClick={() =>
                                        handleStatusChange(
                                            application.id,
                                            'accepted'
                                        )
                                    }
                                >
                                    Accept
                                </button>

                                <button
                                    className="reject-button"
                                    onClick={() =>
                                        handleStatusChange(
                                            application.id,
                                            'rejected'
                                        )
                                    }
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default BusinessApplications