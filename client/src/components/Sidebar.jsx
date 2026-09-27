import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

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
                    <NavLink to="/creator/dashboard">Dashboard</NavLink>
                    <NavLink to="/creator/campaigns">Find Campaigns</NavLink>
                    <NavLink to="/creator/applications">My Applications</NavLink>
                    <NavLink to="/creator/profile">My Profile</NavLink>
                </nav>
            ) : (
                <nav>
                    <NavLink to="/business/dashboard">Dashboard</NavLink>
                    <NavLink to="/business/campaigns">My Campaigns</NavLink>
                    <NavLink to="/business/campaigns/create">Create Campaign</NavLink>
                    <NavLink to="/business/profile">My Profile</NavLink>
                </nav>
            ) }
            <button onClick={handleLogout}>Logout</button>
        </aside>
    )
}

export default Sidebar