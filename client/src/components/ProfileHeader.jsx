import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProfileHeader = ({ name, email }) => {
    const { user } = useAuth()
    return (
        <section className="profile-header">
            <div>
                <h1>{name}</h1>
                <p>{email}</p>
            </div>

            {user?.role == 'creator' ? (
                <Link to="/creator/campaigns">
                    Browse Campaigns
                </Link>
            ) : (
                <Link to="/business/campaigns">
                    My Campaigns
                </Link>
            ) }
        </section>
    )
}

export default ProfileHeader