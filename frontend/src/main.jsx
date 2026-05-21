import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HelmetProvider>
            <AuthProvider>
                <App />
                <Toaster
                    position="bottom-right"
                    gutter={12}
                />
            </AuthProvider>
        </HelmetProvider>
    </StrictMode>
)
