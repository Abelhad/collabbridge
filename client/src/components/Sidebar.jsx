import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {
  FiGrid,
  FiCompass,
  FiFileText,
  FiUser,
  FiBriefcase,
  FiPlusSquare,
  FiLogOut,
} from "react-icons/fi";

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
                    <NavLink to="/creator/dashboard">
                        <FiGrid className="nav-icon" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/creator/campaigns">
                        <FiCompass className="nav-icon" />
                        <span>Find Campaigns</span>
                    </NavLink>
                    <NavLink to="/creator/applications">
                        <FiFileText className="nav-icon" />
                        <span>My Applications</span>
                    </NavLink>
                    <NavLink to="/creator/profile">
                        <FiUser className="nav-icon" />
                        <span>My Profile</span>
                    </NavLink>
                </nav>
            ) : (
                <nav>
                    <NavLink to="/business/dashboard">
                        <FiGrid className="nav-icon" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/business/campaigns" end>
                        <FiBriefcase className="nav-icon" />
                        <span>My Campaigns</span>
                    </NavLink>
                    <NavLink to="/business/applications">
                        <FiFileText className="nav-icon" />
                        <span>Applications</span>
                    </NavLink>
                    <NavLink to="/business/campaigns/create">
                        <FiPlusSquare className="nav-icon" />
                        <span>Create Campaign</span>
                    </NavLink>
                    <NavLink to="/business/profile">
                        <FiUser className="nav-icon" />
                        <span>My Profile</span>
                    </NavLink>
                </nav>
            ) }
            <button onClick={handleLogout}>
                <FiLogOut className="logout-icon" />
                <span>Logout</span>
            </button>
        </aside>
    )
}

export default Sidebar