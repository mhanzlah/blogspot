import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getBlogs } from '../api/blog.api'
import Loader from '../components/Loader'
import Header from '../components/PageTitle'

import Markdown from 'react-markdown'

const Home = () => {

    const navigate = useNavigate()

    const [blogs, setBlogs] = useState([])
    const [featuredBlog, setFeaturedBlog] = useState(null)

    const [loading, setLoading] = useState(true)
    const [fetching, setFetching] = useState(false)

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchBlogs = async (pageNumber = 1) => {

        try {

            if (pageNumber === 1) {
                setLoading(true)
            } else {
                setFetching(true)
            }

            const data = await getBlogs(pageNumber)

            // SET FEATURED BLOG ONLY ONCE
            let currentFeatured = featuredBlog

            if (!featuredBlog) {
                const foundFeatured = data.blogs.find(
                    (blog) => blog.featured === true
                )

                if (foundFeatured) {
                    setFeaturedBlog(foundFeatured)
                    currentFeatured = foundFeatured
                }
            }

            // REMOVE FEATURED BLOG FROM GRID
            const filteredBlogs = data.blogs.filter(
                (blog) => blog._id !== currentFeatured?._id
            )

            setBlogs(filteredBlogs)
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

    if (loading) return <Loader />

    return (
        <div>

            <Header content="Latest Blogs" />

            <div className="md:max-w-7xl md:mx-auto md:container md:border-x">

                {/* FEATURED BLOG */}
                {featuredBlog && (
                    <div
                        onClick={() => navigate(`/blogs/${featuredBlog.slug}`)}
                        className="cursor-pointer border-b p-6 hover:bg-gray-50 transition"
                    >

                        <div className="grid md:grid-cols-2 gap-6 items-center">

                            {/* IMAGE */}
                            <div className="relative">

                                <img
                                    src={featuredBlog.coverImage}
                                    alt={featuredBlog.title}
                                    className="w-full h-72 object-cover border"
                                />

                                <span className="font-grotesk absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 tracking-wide">
                                    FEATURED
                                </span>

                            </div>

                            {/* CONTENT */}
                            <div>

                                <div className='flex items-center justify-between gap-4'>

                                    <h1 className="text-3xl font-bold line-clamp-3">
                                        {featuredBlog.title}
                                    </h1>

                                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                        {featuredBlog?.author?.username}
                                    </span>

                                </div>

                                <p className="text-sm text-gray-500 mt-3">
                                    {new Date(featuredBlog.createdAt).toLocaleDateString()}
                                </p>

                                <div className="mt-5 text-gray-600 line-clamp-4">
                                    <Markdown>
                                        {featuredBlog.excerpt || 'Click to read full article...'}
                                    </Markdown>
                                </div>

                            </div>

                        </div>

                    </div>
                )}

                {/* BLOG GRID */}
                <div className="p-6 relative">

                    {fetching && (
                        <div className="sticky top-0 z-10 bg-white border-b px-4 py-2 text-sm text-gray-500 animate-pulse">
                            Fetching blogs...
                        </div>
                    )}

                    <div className={fetching ? "opacity-70 transition" : ""}>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border">

                            {blogs.map((blog, index) => {

                                const isLastCol = (index + 1) % 4 === 0
                                const isLastRow =
                                    index >= blogs.length - (blogs.length % 4 || 4)

                                return (
                                    <div
                                        key={blog._id}
                                        onClick={() => navigate(`/blogs/${blog.slug}`)}
                                        className={`
  cursor-pointer
  bg-white
  border-b md:border-r
  hover:bg-gray-50
  transition
  ${isLastCol ? 'md:border-r-0' : ''}
  ${isLastRow ? 'md:border-b-0' : ''}
`}

                                    >

                                        <img
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            className="w-full h-40 object-cover"
                                        />

                                        <div className="p-4">

                                            <h2 className="text-sm font-semibold line-clamp-2">
                                                {blog.title}
                                            </h2>

                                            <p className="text-xs text-gray-500 mt-1">

                                                {blog?.author?.username && (
                                                    <span className="text-gray-700 font-medium">
                                                        {blog.author.username} &sdot;{" "}
                                                    </span>
                                                )}

                                                {new Date(blog.createdAt).toLocaleDateString()}

                                            </p>

                                            <div className="text-xs text-gray-600 mt-2 line-clamp-3 lg:line-clamp-2">
                                                <Markdown>
                                                    {blog.excerpt || "No preview available..."}
                                                </Markdown>
                                            </div>

                                        </div>

                                    </div>
                                )
                            })}

                        </div>

                    </div>

                </div>

                {/* PAGINATION */}
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

            </div>

        </div>
    )
}

export default Home
