import React from 'react'

import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='h-[calc(100vh-48px)] border-t grid grid-rows-4'>
            <div className='row-span-3 md:flex'>
                <div className='flex-1 border-r px-5 py-6'>
                    <h2 className='font-light'>Follow Us</h2>
                </div>
                <div className='flex-1 border-r px-5 py-6'>
                    <h2 className='font-light'>Information</h2>
                    <ul>
                        <li>
                            <Link to='/profile'>My Profile</Link>
                        </li>
                    </ul>
                </div>
                <div className='flex-1 border-r px-5 py-6'><h2 className='font-light'>Company</h2></div>
                <div className='flex-1 px-5 py-6'><h2 className='font-light'>Contact Us</h2></div>
            </div>
            <div className='row-span-4'>
                <div className='border-t h-full flex items-center justify-center'>
                    <h1 className='uppercase text-5xl md:text-8xl font-bold tracking-wide md:tracking-widest'>
                        Blogspot
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Footer
