import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const CreatorProfileSetup = () => {
    const [formData, setFormData] = useState({
        bio: '',
        location: '',
        instagram: '',
        instagram_followers: '',
        tiktok: '',
        tiktok_followers: '',
        niche: ''
    })

    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSaving(true)

        try {
            await api.post('/profiles', formData)

            navigate('/creator/dashboard')
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Failed to create profile'
            )
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="creator-profile-setup">
            <h1>Complete Your Profile</h1>
            <p>Tell businesses more about yourself.</p>

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

                <button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Complete Profile'}
                </button>
            </form>
        </div>
    )
}

export default CreatorProfileSetup