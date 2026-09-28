import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiFileText, FiCheckCircle, FiClock, FiSearch, FiBriefcase, FiUser, FiArrowRight } from 'react-icons/fi'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const CreatorDashboard = () => {
    const { user } = useAuth()

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

    const acceptedCount = applications.filter(
        (application) => application.status === 'accepted'
    ).length

    const pendingCount = applications.filter(
        (application) => application.status === 'pending'
    ).length

    const recentApplications = applications.slice(0, 5)

    if (loading) {
        return <p>Loading dashboard...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="creator-dashboard">
            <section className="dashboard-welcome">
                <h1>Welcome, {user?.name} 👋</h1>
                <p>
                    Find campaigns and collaborate with businesses.
                </p>
            </section>

            <section className="dashboard-stats">
                <div>
                    <FiFileText />
                    <h2>{applications.length}</h2>
                    <p>Applications</p>
                </div>

                <div>
                    <FiCheckCircle />
                    <h2>{acceptedCount}</h2>
                    <p>Accepted</p>
                </div>

                <div>
                    <FiClock />
                    <h2>{pendingCount}</h2>
                    <p>Pending</p>
                </div>
            </section>

            <section className="quick-actions">
                <h2>Quick Actions</h2>

                <Link to="/creator/campaigns">
                    <FiSearch />
                    Find Campaigns
                </Link>

                <Link to="/creator/applications">
                    <FiBriefcase />
                    My Applications
                </Link>

                <Link to="/creator/profile">
                    <FiUser />
                    My Profile
                </Link>
            </section>

            <section className="recent-applications">
                <h2>Recent Applications</h2>

                {recentApplications.length === 0 ? (
                    <p>You haven't applied to any campaigns yet.</p>
                ) : (
                    recentApplications.map((application) => (
                        <div key={application.id}>
                            <h3>{application.title}</h3>

                            <p>
                                Status:{' '}
                                <strong>{application.status}</strong>
                            </p>

                            <Link
                                to={`/creator/campaigns/${application.campaign_id}`}
                            >
                                View <FiArrowRight />
                            </Link>
                        </div>
                    ))
                )}
            </section>
        </div>
    )
}

export default CreatorDashboard