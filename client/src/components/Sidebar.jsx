import { Link } from "react-router-dom"

const Sidebar = ({ role, name = 'John Doe', email = 'john@example.com' }) => {
    return (
        <aside className="sidebar">
            <h2>CollabBridge</h2>

            <div className="profile-info">
                <strong>{name}</strong>
                <span>{email}</span>
                <span>{role === 'creator' ? 'Creator' : 'Business'}</span>
            </div>

            {role === 'creator' ? (
                <nav>
                    <Link to="/creator/dashboard">Dashboard</Link>
                    <Link to="/creator/campaigns">Find Campaigns</Link>
                    <Link to="/creator/applications">My Applications</Link>
                    <Link to="/creator/profile">My Profile</Link>
                </nav>
            ) : (
                <nav>
                    <Link to="/creator/dashboard">Dashboard</Link>
                    <Link to="/creator/campaigns">Find Campaigns</Link>
                    <Link to="/creator/applications">My Applications</Link>
                    <Link to="/creator/profile">My Profile</Link>
                </nav>
            ) }
            <button>Logout</button>
        </aside>
    )
}

export default Sidebar