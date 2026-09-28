import { useEffect, useState } from 'react'
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
            <h1>Applications</h1>

            {applications.length === 0 ? (
                <p>You haven't received any applications yet.</p>
            ) : (
                <div>
                    {applications.map((application) => (
                        <div key={application.id}>
                            <h2>{application.creator_name}</h2>

                            <p>
                                <strong>Campaign:</strong>{' '}
                                {application.campaign_title}
                            </p>

                            <p>
                                <strong>Status:</strong>{' '}
                                {application.status}
                            </p>

                            <p>
                                <strong>Message:</strong>{' '}
                                {application.message || 'No message'}
                            </p>
                            <button onClick={() => handleStatusChange(application.id, 'accepted')}>
                                Accept
                            </button>

                            <button onClick={() => handleStatusChange(application.id, 'rejected')}>
                                Reject
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BusinessApplications