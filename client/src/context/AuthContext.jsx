import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getCurrentUser = async ()=>{
            try{
                const response = await api.get('/auth/me')
                setUser(response.data.user)
            }catch(error){
                setUser(null)
            }finally{
                setLoading(false)
            }
        }
        getCurrentUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}