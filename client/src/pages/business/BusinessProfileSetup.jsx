import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const BusinessProfileSetup = () => {
    const [formData, setFormData] = useState({
        business_name: '',
        description: '',
        location: '',
        website: '',
        instagram: '',
        industry: ''
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
            await api.post('/business-profiles', formData)

            navigate('/business/dashboard')
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Failed to create business profile'
            )
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="business-profile-setup">
            <h1>Complete Your Business Profile</h1>
            <p>Tell creators more about your business.</p>

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

                <button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Complete Profile'}
                </button>
            </form>
        </div>
    )
}

export default BusinessProfileSetup