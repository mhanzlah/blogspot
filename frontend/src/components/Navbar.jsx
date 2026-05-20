import NavLink from '../components/Links/NavLink'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

    const { user } = useAuth()

    return (
        <nav className='fixed top-0 z-50 md:px-2 w-full h-12 border-b flex items-center bg-white'>
            <div className='md:hidden w-full h-full flex items-center justify-between'>
                <div className='h-full flex-center'>
                    <NavLink to='/' className='h-full flex-center text-sm tracking-wide'>Home</NavLink>
                </div>
                <div className='h-full flex-center'>
                    <h1 className='text-xl font-bold tracking-wider h-full flex-center'>
                        <NavLink to='/' className='h-full flex-center'>Blogspot</NavLink>
                    </h1>
                </div>
                {user ? (
                    <div className='h-full flex-center'>
                        <NavLink to='/profile' className='h-full flex-center text-sm tracking-wide'>Profile</NavLink>
                    </div>
                ) : (
                    <div className='h-full flex-center'>
                        <NavLink to='/login' className='h-full flex-center text-sm tracking-wide'>Login</NavLink>
                    </div>
                )}
            </div>

            <div className='hidden md:flex w-full h-full items-center justify-between'>
                <div className='h-full flex-center'>
                    <ul className='h-full flex-center'>
                        <li className='h-full flex-center'>
                            <NavLink to='/' className='h-full flex-center text-sm tracking-wide'>
                                Home
                            </NavLink>
                        </li>
                        <li className='h-full flex-center'>
                            <NavLink to='/new' className='h-full flex-center text-sm tracking-wide'>
                                Create a blog
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className='h-full flex-center'>
                    <h1 className='text-xl font-bold tracking-wider h-full flex-center'>
                        <NavLink to='/' className='h-full flex-center'>Blogspot</NavLink>
                    </h1>
                </div>
                <div className='h-full flex-center'>
                    <ul className='h-full flex-center'>
                        {user ? (
                            <>
                                <li className='h-full flex-center'>
                                    <NavLink to='/profile' className='h-full flex-center text-sm tracking-wide'>
                                        Profile
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='h-full flex-center'>
                                    <NavLink to='/login' className='h-full flex-center text-sm tracking-wide'>
                                        Login
                                    </NavLink>
                                </li>
                                <li className='h-full flex-center'>
                                    <NavLink to='/sign-up' className='h-full flex-center text-sm tracking-wide'>
                                        Sign Up
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
