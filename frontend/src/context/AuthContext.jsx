import { createContext, useEffect, useState } from 'react'
import { getMe } from '../api/auth.api.js'
import { setupInterceptor } from '../utils/interceptor.js'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadUser = async () => {
        try {
            const res = await getMe()
            setUser(res.data.user)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setupInterceptor(setUser, navigate)
        loadUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
