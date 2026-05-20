import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const GuestRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) return null

    return !user ? children : <Navigate to='/' replace />
}

export default GuestRoute
