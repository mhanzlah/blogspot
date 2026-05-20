import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'

import Header from '../components/Header'
import Loader from '../components/Loader'

import { getBlog } from '../api/blog.api'

import NotFound from './NotFound'

const Blog = () => {
    const { slug } = useParams()

    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlog(slug)

                setBlog(data)

            } catch (error) {
                console.error(error)

                setBlog(null)

            } finally {
                setLoading(false)
            }
        }

        fetchBlog()
    }, [slug])

    if (loading) return <Loader />

    if (!blog) return <NotFound />

    return (
        <div>
            <Header content={blog.title} />

            <div className='px-5 py-10 md:max-w-7xl md:mx-auto md:container'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-10'>

                    {/* Main Content */}
                    <div className='lg:col-span-3'>

                        {/* Cover Image */}
                        <div className='overflow-hidden rounded-3xl border border-gray-200'>
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className='w-full max-h-[500px] object-cover'
                            />
                        </div>

                        {/* Meta */}
                        <div className='mt-6 flex flex-col gap-4 border-b border-gray-200 pb-6'>

                            {/* Author */}
                            <div className='flex items-center gap-4'>
                                <img
                                    src={blog.author?.avatar}
                                    alt={blog.author?.username}
                                    className='w-14 h-14 rounded-full object-cover border'
                                />

                                <div>
                                    <p className='font-semibold text-lg'>
                                        {blog.author?.username}
                                    </p>

                                    <p className='text-sm text-gray-500'>
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Tags */}
                            {blog.tags?.length > 0 && (
                                <div className='flex flex-wrap gap-2'>
                                    {blog.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className='px-3 py-1 text-sm rounded-full bg-gray-100 border text-gray-700'
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <article className='mt-8 prose prose-lg max-w-none prose-headings:font-inter prose-p:font-inter prose-img:rounded-2xl prose-pre:rounded-2xl'>
                            <Markdown>
                                {blog.content}
                            </Markdown>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className='lg:col-span-1'>
                        <div className='sticky top-24 space-y-6'>

                            {/* Author Card */}
                            <div className='rounded-3xl border border-gray-200 p-5 shadow-sm'>
                                <div className='flex flex-col items-center text-center'>
                                    <img
                                        src={blog.author?.avatar}
                                        alt={blog.author?.username}
                                        className='w-20 h-20 rounded-full object-cover border'
                                    />

                                    <h3 className='mt-4 text-lg font-semibold'>
                                        {blog.author?.username}
                                    </h3>

                                    <p className='mt-2 text-sm text-gray-500'>
                                        Writer & Blogger
                                    </p>
                                </div>
                            </div>

                            {/* Reading Info */}
                            <div className='rounded-3xl border border-gray-200 p-5 shadow-sm'>
                                <h3 className='font-semibold mb-4'>
                                    Blog Info
                                </h3>

                                <div className='space-y-3 text-sm text-gray-600'>
                                    <div className='flex justify-between'>
                                        <span>Status</span>
                                        <span className='capitalize'>
                                            {blog.status}
                                        </span>
                                    </div>

                                    <div className='flex justify-between'>
                                        <span>Reading Time</span>
                                        <span>
                                            {Math.max(
                                                1,
                                                Math.ceil(
                                                    blog.content.split(' ').length / 200
                                                )
                                            )} min
                                        </span>
                                    </div>

                                    <div className='flex justify-between'>
                                        <span>Published</span>
                                        <span>
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className='flex justify-center'>
                                        <button className='border px-4 py-2'>
                                            <Link to={`/edit/${blog.slug}`}>Edit</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </aside>

                </div>
            </div>
        </div>
    )
}

export default Blog
