import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_API_URL

    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const silentRefresh = async () => {
            try {
                const res = await api.post('/auth/refresh')

                const token = res.data.accessToken

                setAccessToken(token)

                api.defaults.headers.common["Authorization"] = `Bearer ${token}`

                const meRes = await api.get('/auth/me')

                setUser(meRes.data);
            } catch (error) {
                console.error(error.response?.data?.message);

                setUser(null)
                setAccessToken(null)
            } finally {
                setLoading(false)
            }
        }

        silentRefresh()
    }, [])

    const register = async (username, email, password) => {
        const res = await api.post(
            '/auth/register',
            {
                username,
                email,
                password
            }
        )

        setAccessToken(res.data.accessToken)
        setUser(res.data.user)
    }

    const login = async (username, password) => {
        const res = await api.post(
            '/auth/login', {
            username,
            password,
        })

        const token = res.data.accessToken
        const user = res.data.user

        setAccessToken(token)
        setUser(user)

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`

        console.log(token, user);


        return token;
    }

    const logout = async () => {
        const res = await api.post('/auth/logout')

        delete api.defaults.headers.common["Authorization"]

        setUser(null)
        setAccessToken(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, loading, setLoading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
