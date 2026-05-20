import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import Input from '../components/Input'


const SignUp = () => {
    const { register } = useAuth()

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setLoading(true)

        try {
            await register(form.username, form.email, form.password)
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Header content='Sign Up for a new Account' />

            <div className='px-5 mb-4 md:max-w-5xl md:container md:mx-auto'>
                <div className='py-12 text-center text-sm'>
                    <p>Sign up to start reading and sharing blogs.</p>
                </div>

                <form className='pt-4' onSubmit={handleSubmit}>

                    {error && (
                        <div className='mb-3'>
                            <p className='text-red-500 text-sm'>{error}</p>
                        </div>
                    )}

                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Username</label>
                        <Input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className='px-3 text-sm mt-1 border w-full h-12'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Email address</label>
                        <Input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className='px-3 text-sm mt-1 border w-full h-12'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Password</label>
                        <Input
                            type='password'
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className='px-3 text-sm mt-1 border w-full h-12'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Confirm password</label>
                        <Input
                            type='password'
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className='px-3 text-sm mt-1 border w-full h-12'
                        />
                    </div>

                    <div className='mt-10'>
                        <button className='form-btn'>
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </div>

                    <div className='mt-6 text-sm text-center text-gray-400'>
                        <p>
                            Already have an account?{' '}
                            <Link to='/login' className='text-black underline'>
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
