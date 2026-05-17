import React from 'react'
import Header from '../components/Header'
import Input from '../components/Input'

import { Link } from 'react-router-dom'

const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <div>
            <Header content='Sign Up for a new Account' />

            <div className='px-5 mb-4 md:max-w-5xl md:container md:mx-auto'>
                <div className='py-12 text-center text-sm'>
                    <p>
                        Sign up to start reading and sharing blogs.
                    </p>
                </div>

                <form className='pt-4' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username" className='text-sm text-gray-400'>
                            Username
                        </label>
                        <Input id='username' className='px-3 text-sm mt-1 border w-full h-12' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="email" className='text-sm text-gray-400'>
                            Email address
                        </label>
                        <Input id='email' className='px-3 text-sm mt-1 border w-full h-12' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password" className='text-sm text-gray-400'>
                            Password
                        </label>
                        <Input id='password' type='password' className='px-3 text-sm mt-1 border w-full h-12' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password-confirm" className='text-sm text-gray-400'>
                            Confirm your password
                        </label>
                        <Input id='password-confirm' type='password' className='text-sm px-3 mt-1 border w-full h-12' />
                    </div>

                    <div className='mt-10'>
                        <button className='form-btn'>
                            Sign Up
                        </button>
                    </div>

                    <div className='mt-6 text-sm text-center text-gray-400'>
                        <p>
                            Already have an account? {' '}
                            <Link to='/login' className='text-black underline'>Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default SignUp
