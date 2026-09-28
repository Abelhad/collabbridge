import DashboardLayout from '../../layouts/DashboardLayout'
import ProfileHeader from '../../components/ProfileHeader'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { FaInstagram } from 'react-icons/fa'
import {
    FiBriefcase,
    FiMapPin,
    FiGlobe,
    FiTag,
    FiEdit,
    FiTrash2
} from 'react-icons/fi'

const BusinessProfile = () => {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { user } = useAuth()
    console.log('test log')

    useEffect(()=> {
        const getProfile = async () => {
            try{
                const response = await api.get('/business-profiles/me')
                setProfile(response.data.profile)
            }catch(error) {
                setError(
                    error.response?.data?.message || 'Failed to load profile'
                )
            }finally{
                setLoading(false)
            }
        }

        getProfile()
    }, [])

    const handleDelete = async () => {
    const confirmed = window.confirm(
        'Are you sure you want to delete your business profile?'
    )

    if (!confirmed) return

    try {
        await api.delete('/business-profiles/me')
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
            <div className='business-profile'>
                <ProfileHeader 
                    name={user?.name} 
                    email={user?.email}
                />
                <section className="business-info">
                    <div>
                        <h2>Business Information</h2>

                        <p>
                            <FiBriefcase />{' '}
                            {profile?.business_name}
                        </p>

                        <p>
                            <strong>Description:</strong>{' '}
                            {profile?.description}
                        </p>

                        <p>
                            <FiMapPin />{' '}
                            {profile?.location}
                        </p>

                        <p>
                            <FiGlobe />{' '}
                            {profile?.website}
                        </p>

                        <p>
                            <FaInstagram />{' '}
                            {profile?.instagram}
                        </p>

                        <p>
                            <FiTag />{' '}
                            {profile?.industry}
                        </p>
                    </div>

                    <div className="profile-actions">
                        <Link to="/business/profile/edit">
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

export default BusinessProfile