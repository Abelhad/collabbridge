import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { FiMapPin, FiUsers, FiTag } from 'react-icons/fi'
import api from '../../services/api'

const CreatorProfileView = () => {
    const { id } = useParams()

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await api.get(`/business-profiles/creator/${id}`)
                setProfile(response.data.profile)
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    'Failed to load creator profile'
                )
            } finally {
                setLoading(false)
            }
        }

        getProfile()
    }, [id])

    if (loading) {
        return <p>Loading profile...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!profile) {
        return <p>Creator profile not found.</p>
    }

    return (
        <div className="creator-profile-view">

            <div className="creator-view-header">
                <h1>{profile.name}</h1>
                <p>{profile.email}</p>
            </div>

            <section className="creator-view-info">

                <div className="creator-view-section">
                    <h2>Creator Information</h2>

                    <p>
                        <strong>Bio:</strong>{' '}
                        {profile.bio || 'Not specified'}
                    </p>

                    <p>
                        <FiMapPin />{' '}
                        {profile.location || 'Not specified'}
                    </p>

                    <p>
                        <FaInstagram />{' '}
                        {profile.instagram || 'Not specified'}
                    </p>

                    <p>
                        <FiUsers />{' '}
                        {profile.instagram_followers
                            ? `${profile.instagram_followers} followers`
                            : 'Followers not specified'}
                    </p>

                    <p>
                        <FaTiktok />{' '}
                        {profile.tiktok || 'Not specified'}
                    </p>

                    <p>
                        <FiUsers />{' '}
                        {profile.tiktok_followers
                            ? `${profile.tiktok_followers} followers`
                            : 'Followers not specified'}
                    </p>

                    <p>
                        <FiTag />{' '}
                        {profile.niche || 'Not specified'}
                    </p>
                </div>

            </section>

        </div>
    )
}

export default CreatorProfileView