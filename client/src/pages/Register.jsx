import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'


const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('creator')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        try{
            await api.post('/auth/register', {
                name,
                email,
                password,
                role
            })
            navigate('/login')
        }catch(error){
            setError(error.response?.data?.message || 'Registration failed')
        }
    }
    return (
        <form onSubmit={handleRegister}>
            <input 
                type="text" 
                placeholder='name'
                value={name}
                onChange={(e)=> setName(e.target.value)}
            />

            <input 
                type="email" 
                placeholder='email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
            />

            <input 
                type="password" 
                placeholder='password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
            />

            <select 
                value={role}
                onChange={(e) => setRole(e.target.value)} 
            >
                <option value="creator">creator</option>
                <option value="business">business</option>
            </select>

            <button type="submit">Register</button>

            {error && <p>{error}</p>}
        </form>
    )
};

export default Register;