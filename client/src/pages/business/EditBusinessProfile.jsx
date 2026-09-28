import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const EditBusinessProfile = () => {
    const [formData, setFormData] = useState({
        business_name: '',
        description: '',
        location: '',
        website: '',
        instagram: '',
        industry: ''
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await api.get('/business-profiles/me')

                const profile = response.data.profile

                setFormData({
                    business_name: profile.business_name || '',
                    description: profile.description || '',
                    location: profile.location || '',
                    website: profile.website || '',
                    instagram: profile.instagram || '',
                    industry: profile.industry || ''
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
            await api.put('/business-profiles/me', formData)

            navigate('/business/profile')
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
        <div className="edit-business-profile">
            <div className="page-header">
                <h1>Edit Profile</h1>
                <p>Update your business information.</p>
            </div>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Business Name</label>
                    <input
                        type="text"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
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
                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        value={formData.website}
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
                    <label>Industry</label>
                    <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button
                        type="button"
                        onClick={() => navigate('/business/profile')}
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

export default EditBusinessProfile