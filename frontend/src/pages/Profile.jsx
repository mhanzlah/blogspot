import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { getMyBlogs, deleteBlog } from '../api/blog.api'
import Loader from '../components/Loader'
import Header from '../components/PageTitle'
import { toast } from '../utils/toast'

const Profile = () => {

    const { user, logout } = useAuth()

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [fetching, setFetching] = useState(false)

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchBlogs = async (pageNumber = 1) => {
        try {
            if (blogs.length === 0) {
                setLoading(true)
            } else {
                setFetching(true)
            }

            const data = await getMyBlogs(pageNumber)

            setBlogs(data.blogs)
            setTotalPages(data.totalPages)

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            setFetching(false)
        }
    }

    useEffect(() => {
        fetchBlogs(page)
    }, [page])

    const handleDelete = async (slug) => {
        const confirm = window.confirm("Are you sure you want to delete this blog?")
        if (!confirm) return

        try {
            await deleteBlog(slug)

            fetchBlogs(page)

        } catch (err) {
            console.error(err)
        }
    }

    const handleLogout = async () => {
        const confirm = window.confirm("Are you sure you want to logout?")
        if (!confirm) return

        try {
            setLoading(true)
            await logout()
            toast("Logout successfully")
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader />

    return (
        <div>
            <Header content="Your Profile" />

            <div className='md:max-w-7xl md:mx-auto md:container md:border-l md:border-r'>
                <div className='grid grid-cols-1 lg:grid-cols-4'>

                    <aside className='lg:col-span-1 border-r'>
                        <div className='sticky top-24 space-y-6 py-4'>

                            {user && (
                                <div className='border-t border-b p-5 text-center'>
                                    <img
                                        src={user.avatar}
                                        alt={user.username}
                                        className='w-24 h-24 mx-auto object-cover border'
                                    />

                                    <h2 className='mt-4 text-xl font-semibold'>
                                        {user.username}
                                    </h2>

                                    <p className='text-sm text-gray-500 mt-1 break-all'>
                                        {user.email}
                                    </p>

                                    <button
                                        onClick={handleLogout}
                                        className='mt-5 border px-4 py-2 hover:bg-black hover:text-white transition-colors'
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}

                        </div>
                    </aside>

                    <main className='lg:col-span-3'>

                        <div className="border-b px-6 py-4 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                My Blogs
                            </h2>

                            <Link
                                to="/new"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border
                                hover:bg-black hover:text-white"
                            >
                                Create Blog
                            </Link>
                        </div>

                        <div className="relative">

                            {fetching && (
                                <div className="sticky top-0 z-10 bg-white border-b px-4 py-2 text-sm text-gray-500 animate-pulse">
                                    Fetching blogs...
                                </div>
                            )}

                            {!loading && !fetching && blogs.length === 0 && (
                                <div className='p-6'>
                                    <p className='text-gray-500'>
                                        No blogs found. Start writing
                                    </p>
                                </div>
                            )}

                            {blogs.length > 0 && (
                                <div className={fetching ? "opacity-70 transition" : ""}>
                                    {blogs.map((blog) => (
                                        <div key={blog._id} className="border-b p-6">

                                            <div className='flex gap-5 flex-col md:flex-row'>

                                                <img
                                                    src={blog.coverImage}
                                                    alt={blog.title}
                                                    className='w-full md:w-52 h-40 object-cover border'
                                                />

                                                <div className='flex-1'>

                                                    <div className="flex justify-between gap-4">

                                                        <div>
                                                            <h3 className="text-xl font-semibold line-clamp-2">
                                                                {blog.title}
                                                            </h3>

                                                            <p className="text-sm text-gray-500 mt-2">
                                                                {new Date(blog.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>

                                                        <div className="flex-shrink-0">
                                                            <span className="inline-flex items-center text-xs font-medium px-3 py-1 border">
                                                                {blog.status}
                                                            </span>
                                                        </div>

                                                    </div>

                                                    <div className='flex gap-3 mt-6 text-sm'>

                                                        <Link
                                                            to={`/blogs/${blog.slug}`}
                                                            className='border px-4 py-2 hover:bg-black hover:text-white'
                                                        >
                                                            View
                                                        </Link>

                                                        <Link
                                                            to={`/edit/${blog.slug}`}
                                                            className='border px-4 py-2 hover:bg-black hover:text-white'
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDelete(blog.slug)}
                                                            className='border px-4 py-2 hover:bg-red-500 hover:text-white hover:border-red-500'
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                        {blogs.length > 0 && (
                            <div className="flex items-center justify-center gap-4 py-8">

                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => p - 1)}
                                    className={`
                px-5 py-2.5
                border border-black
                text-sm font-medium
                transition-all duration-200
                ${page === 1
                                            ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                            : 'bg-black text-white hover:bg-white hover:text-black'
                                        }
            `}
                                >
                                    Prev
                                </button>

                                <div className="px-4 py-2 text-sm font-medium min-w-30 text-center">
                                    Page {page} of {totalPages}
                                </div>

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                    className={`
                px-5 py-2.5
                border border-black
                text-sm font-medium
                transition-all duration-200
                ${page === totalPages
                                            ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                            : 'bg-black text-white hover:bg-white hover:text-black'
                                        }
            `}
                                >
                                    Next
                                </button>

                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Profile
