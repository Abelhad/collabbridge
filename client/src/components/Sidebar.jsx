import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const { user, setUser } = useAuth()
    console.log(user)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout')
            setUser(null)
            navigate('/login')
        } catch (error) {
            console.error('Logout failed')
        }
    }

    return (
        <aside className="sidebar">
            <h2>CollabBridge</h2>

            <div className="profile-info">
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
                <span>{user?.role === 'creator' ? 'Creator' : 'Business'}</span>
            </div>

            {user?.role === 'creator' ? (
                <nav>
                    <Link to="/creator/dashboard">Dashboard</Link>
                    <Link to="/creator/campaigns">Find Campaigns</Link>
                    <Link to="/creator/applications">My Applications</Link>
                    <Link to="/creator/profile">My Profile</Link>
                </nav>
            ) : (
                <nav>
                    <Link to="/business/dashboard">Dashboard</Link>
                    <Link to="/business/campaigns">My Campaigns</Link>
                    <Link to="/business/campaigns/create">Create Campaign</Link>
                    <Link to="/business/profile">My Profile</Link>
                </nav>
            ) }
            <button onClick={handleLogout}>Logout</button>
        </aside>
    )
}

export default Sidebar