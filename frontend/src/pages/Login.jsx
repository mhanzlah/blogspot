import Header from '../components/Header'
import Input from '../components/Input'

import { Link } from 'react-router-dom'

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <div>
            <Header content='Login to your Account' />

            <div className='px-5 mb-4 md:max-w-5xl md:container md:mx-auto'>
                <div className='py-12 text-center text-sm'>
                    <p>
                        Welcome back. Log in to continue.
                    </p>
                </div>

                <form className='pt-4' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username" className='text-sm text-gray-400'>
                            Username or Email address
                        </label>
                        <Input id='username' className='px-3 text-sm mt-1 border w-full h-12' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password" className='text-sm text-gray-400'>
                            Password
                        </label>
                        <Input id='password' type='password' className='px-3 text-sm mt-1 border w-full h-12' />
                    </div>

                    <div className='mt-10'>
                        <button className='form-btn'>
                            Login
                        </button>
                    </div>

                    <div className='mt-6 text-sm text-center text-gray-400'>
                        <p>
                            Don't have an account? {' '}
                            <Link to='/sign-up' className='text-black underline'>Sign Up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Login
