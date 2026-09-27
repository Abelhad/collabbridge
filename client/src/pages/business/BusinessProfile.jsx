import DashboardLayout from '../../layouts/DashboardLayout'
import ProfileHeader from '../../components/ProfileHeader'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

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

    if (loading) {
        return <p>Loading profile...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <DashboardLayout>
            <div className='business-profile'>
                <ProfileHeader 
                    name={user?.name} 
                    email={user?.email}
                />
                <section className="business-info">
                    <div>
                        <h2>Business Information</h2>

                        <p>
                            <strong>Business Name:</strong>{' '}
                            {profile?.business_name}
                        </p>

                        <p>
                            <strong>Description:</strong>{' '}
                            {profile?.description}
                        </p>

                        <p>
                            <strong>Location:</strong>{' '}
                            {profile?.location}
                        </p>

                        <p>
                            <strong>Website:</strong>{' '}
                            {profile?.website}
                        </p>

                        <p>
                            <strong>Instagram:</strong>{' '}
                            {profile?.instagram}
                        </p>

                        <p>
                            <strong>Industry:</strong>{' '}
                            {profile?.industry}
                        </p>
                    </div>

                    <div className="profile-actions">
                        <Link to="/business/profile/edit">Edit</Link>
                        <button>Delete</button>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    )
}

export default BusinessProfile