import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { getMyBlogs, deleteBlog } from '../api/blog.api'
import Loader from '../components/Loader'
import Header from '../components/Header'

const Profile = () => {

    const { user, logout } = useAuth()

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)


    const fetchBlogs = async () => {
        try {
            setLoading(true)

            const data = await getMyBlogs(page)

            console.log(data);

            setBlogs(data.blogs)
            setPagination(data.pagination)

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [page])

    const handleDelete = async (slug) => {
        const confirm = window.confirm("Are you sure you want to delete this blog?")
        if (!confirm) return

        try {
            await deleteBlog(slug)
            fetchBlogs()
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

            {user && (
                <div className="flex items-center gap-5 p-6 border-b">
                    <img
                        src={user.avatar}
                        className="w-16 h-16 rounded-full object-cover"
                    />

                    <div>
                        <h2 className="text-xl font-bold">
                            {user.username}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {user.email}
                        </p>
                    </div>

                    <div>
                        <button className='border px-4 py-2' onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            )}

            <div className="p-6">
                <div className='flex-center'>
                    <h2 className="text-2xl font-bold mb-6">
                        My Blogs
                    </h2>
                    <Link to='/new'>
                        Create a blog
                    </Link>
                </div>

                {blogs.length === 0 ? (
                    <p className="text-gray-500">
                        No blogs found. Start writing 🚀
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {blogs.map((blog) => (
                                    <tr key={blog._id} className="border-t">
                                        <td className="p-3 font-medium">
                                            {blog.title}
                                        </td>

                                        <td className="p-3">
                                            <span className={`text-xs px-3 py-1 rounded-full ${blog.status === "published"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {blog.status}
                                            </span>
                                        </td>

                                        <td className="p-3 text-gray-500 text-sm">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-center gap-3 text-sm">

                                                {/* VIEW */}
                                                <Link
                                                    to={`/blogs/${blog.slug}`}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    View
                                                </Link>

                                                {/* EDIT */}
                                                <Link
                                                    to={`/edit/${blog.slug}`}
                                                    className="text-green-500 hover:underline"
                                                >
                                                    Edit
                                                </Link>

                                                {/* DELETE */}
                                                <button
                                                    onClick={() => handleDelete(blog.slug)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
