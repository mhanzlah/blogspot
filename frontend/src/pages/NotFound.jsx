import { Link } from 'react-router-dom'

import Header from '../components/Header'

const NotFound = () => {
    return (
        <>
            <div>
                <Header content='404 Page not found' />

                <div className='px-5 py-10 md:mx-auto md:max-w-2xl flex-center flex-col'>
                    <p className='text-sm'>
                        We couldn't find the page you were looking for.
                    </p>

                    <Link to='/' className='border px-2 bg-black text-white hover:bg-white hover:text-black'>Explore blogs</Link>
                </div>
            </div>
        </>
    )
}

export default NotFound
