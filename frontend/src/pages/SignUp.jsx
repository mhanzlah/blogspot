import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageTitle from '../components/PageTitle';

import { toast } from '../utils/toast'

const SignUp = () => {
    const { register } = useAuth()

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (loading) return

        if (!form.username || !form.email || !form.password || !form.confirmPassword) {
            toast("All fields are required", false);
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast("Passwords do not match", false)
            return
        }

        setLoading(true)

        try {
            await register(form.username, form.email, form.password)
            toast("Account created successfully")
        } catch (err) {
            toast(err.response?.data?.message || 'Signup failed', false)
        } finally {
            setLoading(false)
        }
    }

    const isDisabled = loading

    return (
        <div>
            <PageTitle content='Sign Up for a new Account' />

            <div className='px-5 mb-4 md:max-w-5xl md:container md:mx-auto py-8'>
                <div className='py-4 text-center text-sm'>
                    <p>Sign up to start reading and sharing blogs.</p>
                </div>

                <form className='pt-4' onSubmit={handleSubmit}>

                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Username</label>
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            disabled={isDisabled}
                            className='px-3 text-sm mt-1 border w-full h-12'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Email address</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            disabled={isDisabled}
                            className='px-3 text-sm mt-1 border w-full h-12'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Password</label>
                        <input
                            type='password'
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            disabled={isDisabled}
                            className='px-3 text-sm mt-1 border w-full h-12'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Confirm password</label>
                        <input
                            type='password'
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            disabled={isDisabled}
                            className='px-3 text-sm mt-1 border w-full h-12'
                        />
                    </div>

                    <div className='mt-10'>
                        <button
                            type='submit'
                            disabled={isDisabled}
                            className={`form-btn flex items-center justify-center gap-2 transition-all ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading && (
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}

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
