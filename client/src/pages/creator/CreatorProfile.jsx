import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import ProfileHeader from '../../components/ProfileHeader'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { FiMapPin, FiUsers, FiTag, FiEdit, FiTrash2 } from 'react-icons/fi'

const CreatorProfile = () => {
    const { user } = useAuth()

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await api.get('/profiles/me')
                setProfile(response.data.profile)
            } catch (error) {
                setError(
                    error.response?.data?.message || 'Failed to load profile'
                )
            } finally {
                setLoading(false)
            }
        }

        getProfile()
    }, [])

    const handleDelete = async () => {
    const confirmed = window.confirm(
        'Are you sure you want to delete your profile?'
    )

    if (!confirmed) return

    try {
        await api.delete('/profiles/me')
        window.location.reload()
    } catch (error) {
        console.error(error)
    }
}

    if (loading) {
        return <p>Loading profile...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="creator-profile">

            <ProfileHeader
                name={user?.name}
                email={user?.email}
            />

            <section className="creator-info">
                <div>
                    <h2>Creator Information</h2>

                    <p>
                        <strong>Bio:</strong>{' '}
                        {profile?.bio}
                    </p>

                    <p>
                        <FiMapPin />{' '}
                        {profile?.location}
                    </p>

                    <p>
                        <FaInstagram />{' '}
                        {profile?.instagram}
                    </p>

                    <p>
                        <FiUsers />{' '}
                        {profile?.instagram_followers} followers
                    </p>

                    <p>
                        <FaTiktok />{' '}
                        {profile?.tiktok}
                    </p>

                    <p>
                        <FiUsers />{' '}
                        {profile?.tiktok_followers} followers
                    </p>

                    <p>
                        <FiTag />{' '}
                        {profile?.niche}
                    </p>
                </div>

                <div className="profile-actions">
                    <Link to="/creator/profile/edit">
                        <FiEdit /> Edit
                    </Link>

                    <button onClick={handleDelete}>
                        <FiTrash2 /> Delete
                    </button>
                </div>
            </section>

        </div>
    )
}

export default CreatorProfile