import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api'
import { useAuth } from '../context/AuthContext'



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try{
      const response = await api.post('/auth/login', {
        email,
        password
      })
      setUser(response.data.user)
      if(response.data.user.role === 'creator'){
        navigate('/creator/dashboard')
      }else{
        navigate('/business/dashboard')
      }
    }catch(error){
      setError(error.response?.data?.message || 'Login failed')
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <input type="email" 
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input type="password" 
        placeholder="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
      {error && <p>{error}</p>}
      
    </form>
  )
}

export default Login;