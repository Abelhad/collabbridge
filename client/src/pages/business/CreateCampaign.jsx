import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const CreateCampaign = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [budget, setBudget] = useState('')
    const [deadline, setDeadline] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await api.post('/campaigns', {
                title,
                description,
                location,
                budget,
                deadline
            })

            navigate('/business/campaigns')
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Failed to create campaign'
            )
        }
    }

    return (
        <div className="create-campaign">
            <h1>Create Campaign</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Campaign title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Campaign description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />

                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />

                <button type="submit">
                    Create Campaign
                </button>

                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default CreateCampaign