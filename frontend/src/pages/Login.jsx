import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import PageTitle from '../components/PageTitle'

import { toast } from '../utils/toast'

const Login = () => {
    const { login, user } = useAuth()

    const [form, setForm] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (loading) return

        setLoading(true)

        if (!form.username || !form.password) {
            toast('Username and password are required', false);
            return
        }

        try {
            await login(form.username, form.password)
            toast('Login successful')
        } catch (error) {
            toast(error.response?.data?.message || 'Login failed', false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <PageTitle content='Login to your Account' />

            <div className='px-5 mb-4 md:max-w-5xl md:container md:mx-auto py-8'>
                <div className='py-4 text-center text-sm'>
                    <p>Welcome back. Log in to continue.</p>
                </div>

                <form className='pt-4' onSubmit={handleSubmit}>

                    <div className='mb-3'>
                        <label htmlFor="username" className='text-sm text-gray-400'>
                            Username or Email address
                        </label>

                        <input
                            id='username'
                            className='px-3 text-sm mt-1 border w-full h-12'
                            name='username'
                            value={form.username}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password" className='text-sm text-gray-400'>
                            Password
                        </label>

                        <input
                            id='password'
                            type='password'
                            className='px-3 text-sm mt-1 border w-full h-12'
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className='mt-10'>
                        <button
                            type='submit'
                            disabled={loading}
                            className={`form-btn flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading && (
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}

                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>

                    <div className='mt-6 text-sm text-center text-gray-400'>
                        <p>
                            No Account?{' '}
                            <Link to='/sign-up' className='text-black underline'>
                                Sign Up
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
