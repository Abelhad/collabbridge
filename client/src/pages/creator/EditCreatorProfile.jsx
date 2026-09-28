import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const EditCreatorProfile = () => {
    const [formData, setFormData] = useState({
        bio: '',
        location: '',
        instagram: '',
        instagram_followers: '',
        tiktok: '',
        tiktok_followers: '',
        niche: ''
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await api.get('/profiles/me')

                const profile = response.data.profile

                setFormData({
                    bio: profile.bio || '',
                    location: profile.location || '',
                    instagram: profile.instagram || '',
                    instagram_followers: profile.instagram_followers || '',
                    tiktok: profile.tiktok || '',
                    tiktok_followers: profile.tiktok_followers || '',
                    niche: profile.niche || ''
                })
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    'Failed to load profile'
                )
            } finally {
                setLoading(false)
            }
        }

        getProfile()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError('')

        try {
            await api.put('/profiles/me', formData)

            navigate('/creator/profile')
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Failed to update profile'
            )
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <p>Loading profile...</p>
    }

    return (
        <div className="edit-creator-profile">
            <div className="page-header">
                <h1>Edit Profile</h1>
                <p>Update your creator information.</p>
            </div>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Instagram</label>
                    <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Instagram Followers</label>
                    <input
                        type="number"
                        name="instagram_followers"
                        value={formData.instagram_followers}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>TikTok</label>
                    <input
                        type="text"
                        name="tiktok"
                        value={formData.tiktok}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>TikTok Followers</label>
                    <input
                        type="number"
                        name="tiktok_followers"
                        value={formData.tiktok_followers}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Niche</label>
                    <input
                        type="text"
                        name="niche"
                        value={formData.niche}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button
                        type="button"
                        onClick={() => navigate('/creator/profile')}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default EditCreatorProfile