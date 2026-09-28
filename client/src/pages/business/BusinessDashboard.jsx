import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBriefcase, FiFileText, FiClock, FiPlus, FiUser, FiArrowRight } from 'react-icons/fi'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const BusinessDashboard = () => {
    const { user } = useAuth()

    const [campaigns, setCampaigns] = useState([])
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                const [campaignsResponse, applicationsResponse] =
                    await Promise.all([
                        api.get('/campaigns'),
                        api.get('/applications/business')
                    ])

                setCampaigns(campaignsResponse.data.campaigns)
                setApplications(applicationsResponse.data.applications)
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    'Failed to load dashboard'
                )
            } finally {
                setLoading(false)
            }
        }

        getDashboardData()
    }, [])

    const pendingCount = applications.filter(
        (application) => application.status === 'pending'
    ).length

    const recentCampaigns = campaigns.slice(0, 5)

    if (loading) {
        return <p>Loading dashboard...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="business-dashboard">
            <section className="dashboard-welcome">
                <h1>Welcome, {user?.name} 👋</h1>
                <p>
                    Manage your campaigns and find creators to work with.
                </p>
            </section>

            <section className="dashboard-stats">
                <div>
                    <FiBriefcase />
                    <h2>{campaigns.length}</h2>
                    <p>Campaigns</p>
                </div>

                <div>
                    <FiFileText />
                    <h2>{applications.length}</h2>
                    <p>Applications</p>
                </div>

                <div>
                    <FiClock />
                    <h2>{pendingCount}</h2>
                    <p>Pending Applications</p>
                </div>
            </section>

            <section className="quick-actions">
                <h2>Quick Actions</h2>

                <Link to="/business/campaigns/create">
                    <FiPlus />
                    Create Campaign
                </Link>

                <Link to="/business/campaigns">
                    <FiBriefcase />
                    My Campaigns
                </Link>

                <Link to="/business/profile">
                    <FiUser />
                    My Profile
                </Link>
            </section>

            <section className="recent-campaigns">
                <h2>Recent Campaigns</h2>

                {recentCampaigns.length === 0 ? (
                    <p>You haven't created any campaigns yet.</p>
                ) : (
                    recentCampaigns.map((campaign) => (
                        <div key={campaign.id}>
                            <h3>{campaign.title}</h3>

                            <p>
                                {campaign.description}
                            </p>

                            <Link
                                to={`/business/campaigns/${campaign.id}/edit`}
                            >
                                View / Edit <FiArrowRight />
                            </Link>
                        </div>
                    ))
                )}
            </section>
        </div>
    )
}

export default BusinessDashboard