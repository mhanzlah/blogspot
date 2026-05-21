import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';
import { getBlog, getBlogsByAuthor } from '../api/blog.api';
import NotFound from './NotFound';
import PageTitle from '../components/PageTitle';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const Blog = () => {
    const { user } = useAuth();
    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [moreBlogs, setMoreBlogs] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlog(slug)

                setBlog(data)

                const authorBlogs = await getBlogsByAuthor(data.author._id, slug);

                setMoreBlogs(authorBlogs)

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
            <PageTitle content={blog.title} />

            <div className='md:max-w-7xl md:mx-auto md:container md:border-l md:border-r'>
                <div className='grid grid-cols-1 lg:grid-cols-4'>

                    <div className='lg:col-span-3 border-r'>

                        <div className='overflow-hidden border-b px-4 py-2'>
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className='w-full max-h-125 object-cover'
                            />
                        </div>

                        <article
                            className='
        px-8 py-6
        prose prose-lg max-w-none
        prose-headings:font-inter
        prose-p:font-inter
        prose-img:rounded-2xl
        prose-pre:rounded-2xl

        prose-table:block
        prose-table:w-full
        prose-table:overflow-x-auto

        prose-th:border
        prose-th:px-3
        prose-th:py-2
        prose-th:bg-gray-100

        prose-td:border
        prose-td:px-3
        prose-td:py-2
    '
                        >
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {blog.content}
                            </Markdown>
                        </article>
                    </div>

                    <aside className='lg:col-span-1'>
                        <div className='sticky top-24 space-y-6 py-4'>

                            <div className='border-t border-b p-5'>
                                <div className='flex flex-col items-center text-center'>
                                    <img
                                        src={blog.author?.avatar}
                                        alt={blog.author?.username}
                                        className='w-20 h-20 object-cover border'
                                    />

                                    <h3 className='mt-4 text-lg font-semibold'>
                                        {blog.author?.username}
                                    </h3>
                                </div>
                            </div>

                            <div className='border-t border-b p-5'>
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

                                    {blog.author._id === user?.id && (
                                        <div className='flex justify-center'>
                                            <button className='border px-4 py-2 bg-white hover:bg-black text-black hover:text-white'>
                                                <Link to={`/edit/${blog.slug}`}>Edit</Link>

                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='border-t border-b p-5'>
                                <h3 className='font-semibold mb-4'>
                                    More from author
                                </h3>

                                <div className='space-y-4'>
                                    {moreBlogs.length === 0 ? (<p className='text-sm text-gray-500'>No more blogs yet.</p>) : moreBlogs.map((item) => (
                                        <Link
                                            key={item._id}
                                            to={`/blogs/${item.slug}`}
                                            className='block group'
                                        >
                                            <div className='flex gap-3'>

                                                <img
                                                    src={item.coverImage}
                                                    alt={item.title}
                                                    className='w-20 h-20 object-cover border'
                                                />

                                                <div className='flex-1 min-w-0'>
                                                    <h4 className='text-sm font-medium line-clamp-2 group-hover:underline'>
                                                        {item.title}
                                                    </h4>

                                                    <p className='text-xs text-gray-500 mt-1'>
                                                        {new Date(item.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>

                                            </div>
                                        </Link>
                                    ))}
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
