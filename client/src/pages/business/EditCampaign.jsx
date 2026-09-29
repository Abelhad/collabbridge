import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api'

const EditCampaign = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        budget: '',
        deadline: ''
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const getCampaign = async () => {
            try {
                const response = await api.get(`/campaigns/${id}`)

                const campaign = response.data.campaign

                setFormData({
                    title: campaign.title || '',
                    description: campaign.description || '',
                    location: campaign.location || '',
                    budget: campaign.budget || '',
                    deadline: campaign.deadline
                        ? campaign.deadline.split('T')[0]
                        : ''
                })
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    'Failed to load campaign'
                )
            } finally {
                setLoading(false)
            }
        }

        getCampaign()
    }, [id])

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
            await api.put(`/campaigns/${id}`, formData)

            navigate('/business/campaigns')
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Failed to update campaign'
            )
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <p>Loading campaign...</p>
    }

    return (
        <div className="edit-campaign">
            <div className="page-header">
                <h1>Edit Campaign</h1>
                <p>Update your campaign information.</p>
            </div>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
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
                    <label>Budget</label>
                    <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button
                        type="button"
                        onClick={() => navigate('/business/campaigns')}
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

export default EditCampaign