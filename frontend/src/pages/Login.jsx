import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import Input from '../components/Input'

const Login = () => {

    const { login, user, accessToken } = useAuth()

    const [form, setForm] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const token = await login(form.username, form.password)
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {user && <div>{user.username}</div>}
            <Header content='Login to your Account' />

            <div className='px-5 mb-4 md:max-w-5xl md:container md:mx-auto'>
                <div className='py-12 text-center text-sm'>
                    <p>
                        Welcome back. Log in to continue.
                    </p>
                </div>

                <form className='pt-4' onSubmit={handleSubmit}>

                    {error && (
                        <div className='mb-3'>
                            <p className='text-red-500 text-sm'>{error}</p>
                        </div>
                    )}

                    <div className='mb-3'>
                        <label htmlFor="username" className='text-sm text-gray-400'>
                            Username or Email address
                        </label>
                        <Input id='username' className='px-3 text-sm mt-1 border w-full h-12' name='username' value={form.username} onChange={handleChange} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password" className='text-sm text-gray-400'>
                            Password
                        </label>
                        <Input id='password' type='password' className='px-3 text-sm mt-1 border w-full h-12' name='password' value={form.password} onChange={handleChange} />
                    </div>

                    <div className='mt-10'>
                        <button className='form-btn'>
                            {loading ? 'Logging in' : 'Login'}
                        </button>
                    </div>

                    <div className='mt-6 text-sm text-center text-gray-400'>
                        <p>
                            No Account? {' '}
                            <Link to='/sign-up' className='text-black underline'>Sign Up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Login
