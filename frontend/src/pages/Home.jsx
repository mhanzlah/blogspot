import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { getBlogs } from '../api/blog.api'
import Header from '../components/Header'
import Loader from '../components/Loader'

const BlogCard = ({ blog, featured = false }) => {
    return (
        <Link
            to={`/blogs/${blog.slug}`}
            className='group border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white'
        >
            <div className='overflow-hidden'>
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className={`
                        w-full object-cover transition-transform duration-500 group-hover:scale-105
                        ${featured ? 'h-[350px]' : 'h-56'}
                    `}
                />
            </div>

            <div className='p-6'>

                {/* Tags */}
                {blog.tags?.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-4'>
                        {blog.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className='text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600'
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h2
                    className={`
                        font-bold text-gray-900 group-hover:text-gray-600 transition-colors
                        ${featured ? 'text-3xl' : 'text-xl'}
                    `}
                >
                    {blog.title}
                </h2>

                {/* Excerpt */}
                <div className='mt-3 text-gray-500 text-sm line-clamp-1 overflow-hidden'>
                    <Markdown
                        components={{
                            p: ({ children }) => <span>{children}</span>,
                            h1: ({ children }) => <span>{children}</span>,
                            h2: ({ children }) => <span>{children}</span>,
                            h3: ({ children }) => <span>{children}</span>,
                            ul: ({ children }) => <span>{children}</span>,
                            ol: ({ children }) => <span>{children}</span>,
                            li: ({ children }) => <span>{children}</span>,
                            blockquote: ({ children }) => <span>{children}</span>,
                            pre: ({ children }) => <span>{children}</span>,
                            code: ({ children }) => <span>{children}</span>,
                        }}
                    >
                        {blog.excerpt}
                    </Markdown>
                </div>

                {/* Footer */}
                <div className='mt-6 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img
                            src={blog.author?.avatar}
                            alt={blog.author?.username}
                            className='w-10 h-10 rounded-full object-cover'
                        />

                        <div>
                            <p className='text-sm font-medium'>
                                {blog.author?.username}
                            </p>

                            <p className='text-xs text-gray-500'>
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <span className='text-sm text-gray-500'>
                        {blog.readTime || '2 min read'}
                    </span>
                </div>
            </div>
        </Link>
    )
}

const Home = () => {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)

    useEffect(() => {

        const fetchBlogs = async () => {
            try {

                const data = await getBlogs(page)

                console.log(data);


                setBlogs(data.blogs)
                setPagination(data.pagination)

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs()

    }, [page])

    if (loading) return <Loader />

    const featuredBlog = blogs[0]
    const topBlogs = blogs.slice(1, 7)
    const remainingBlogs = blogs.slice(7)

    if (!loading && blogs.length === 0) {
        return (
            <div>
                <Header content="Latest Blogs" />

                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        No blogs found
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Be the first one to create a blog 🚀
                    </p>

                    <Link
                        to="/new"
                        className="mt-5 px-6 py-2 rounded-full bg-black text-white"
                    >
                        Create Blog
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div>

            {/* Hero */}
            <Header content='Latest Blogs' />

            <div className='px-5 py-10 md:max-w-7xl md:mx-auto md:container'>

                {/* Featured */}
                {featuredBlog && (
                    <section className='mb-16'>
                        <BlogCard
                            blog={featuredBlog}
                            featured
                        />
                    </section>
                )}

                {/* Trending */}
                {topBlogs.length > 0 && (
                    <section className='mb-16'>

                        <div className='flex items-center justify-between mb-8'>
                            <h2 className='text-3xl font-bold'>
                                Trending Articles
                            </h2>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                            {topBlogs.map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    blog={blog}
                                />
                            ))}
                        </div>

                    </section>
                )}

                {remainingBlogs.length > 0 && (
                    <section>

                        <div className='flex items-center justify-between mb-8'>
                            <h2 className='text-3xl font-bold'>
                                More Stories
                            </h2>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                            {remainingBlogs.map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    blog={blog}
                                />
                            ))}
                        </div>

                    </section>
                )}

                {pagination && pagination.totalPages > 1 && (
                    <div className='flex justify-center mt-14 gap-3 flex-wrap'>

                        <button
                            disabled={!pagination.hasPrevPage}
                            onClick={() => setPage((prev) => prev - 1)}
                            className='px-5 h-11 rounded-full border disabled:opacity-50'
                        >
                            Prev
                        </button>

                        {Array.from({
                            length: pagination.totalPages
                        }).map((_, index) => {

                            const pageNumber = index + 1

                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => setPage(pageNumber)}
                                    className={`
                                        w-11 h-11 rounded-full border transition
                                        ${page === pageNumber
                                            ? 'bg-black text-white'
                                            : 'hover:bg-black hover:text-white'
                                        }
                                    `}
                                >
                                    {pageNumber}
                                </button>
                            )
                        })}

                        <button
                            disabled={!pagination.hasNextPage}
                            onClick={() => setPage((prev) => prev + 1)}
                            className='px-5 h-11 rounded-full border disabled:opacity-50'
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
