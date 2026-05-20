import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HelmetProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </HelmetProvider>
    </StrictMode>
)
