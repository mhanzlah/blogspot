import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'

import { getBlog, updateBlog, deleteBlog } from '../api/blog.api.js'
import { useAuth } from '../context/AuthContext.jsx'

import NotFound from './NotFound.jsx'
import PageTitle from '../components/PageTitle.jsx'
import Loader from '../components/Loader.jsx'

import { toast } from '../utils/toast.jsx'

const EditBlog = () => {
    const { user } = useAuth()
    const { slug } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)

    const [blog, setBlog] = useState(null)

    const [form, setForm] = useState({
        title: '',
        coverImage: null,
        content: '',
        status: 'published',
        tags: ''
    })

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlog(slug)

                setBlog(data)

                setForm({
                    title: data.title || '',
                    content: data.content || '',
                    status: data.status || 'published',
                    tags: data.tags?.join(', ') || '',
                    coverImage: null
                })

            } catch (error) {
                console.error(error)
                setBlog(null)
            } finally {
                setLoading(false)
            }
        }

        fetchBlog()
    }, [slug])

    const handleChange = (e) => {
        const { name, value, files } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.title || !form.content) {
            toast('Title and content are required', false)
            return
        }

        setUpdating(true)

        try {
            const formData = new FormData()

            formData.append('title', form.title)
            formData.append('content', form.content)
            formData.append('status', form.status)
            formData.append('tags', form.tags)

            if (form.coverImage) {
                formData.append('coverImage', form.coverImage)
            }

            const updated = await updateBlog(slug, formData)

            toast('Blog updated successfully')

            navigate(`/blogs/${updated.slug}`)

        } catch (error) {
            console.error(error)

            toast(
                error?.response?.data?.message || 'Failed to update blog',
                false
            )
        } finally {
            setUpdating(false)
        }
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this blog?'
        )

        if (!confirmDelete) return

        try {
            await deleteBlog(slug)

            toast('Blog deleted successfully')

            navigate('/')

        } catch (error) {
            console.error(error)

            toast(
                error?.response?.data?.message || 'Failed to delete blog',
                false
            )
        }
    }

    if (loading) return <Loader />

    if (!blog) return <NotFound />

    return (
        <div>
            <PageTitle content='Edit Blog' />

            <div className='px-5 mb-4 md:max-w-5xl md:container md:mx-auto py-8'>

                <div className='py-4 text-center text-sm text-gray-500'>
                    <p>Update your blog post.</p>
                </div>

                <form className='pt-4' onSubmit={handleSubmit}>

                    {/* TITLE */}
                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>
                            Title
                        </label>

                        <input
                            name='title'
                            value={form.title}
                            onChange={handleChange}
                            placeholder='Enter blog title...'
                            className='px-3 text-sm mt-1 border w-full h-12 outline-none'
                        />
                    </div>

                    {/* COVER IMAGE */}
                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>
                            Cover Image
                        </label>

                        <div className='mt-1 flex items-center justify-between border px-3 h-12 bg-white'>

                            <input
                                type='file'
                                name='coverImage'
                                onChange={handleChange}
                                className='text-sm w-full'
                            />

                            {form.coverImage ? (
                                <span className='text-xs text-gray-500 truncate max-w-30'>
                                    {form.coverImage.name}
                                </span>
                            ) : (
                                blog.coverImage && (
                                    <span className='text-xs text-gray-400 truncate max-w-30'>
                                        Current Image
                                    </span>
                                )
                            )}

                        </div>
                    </div>

                    {/* CONTENT + PREVIEW */}
                    <div className='mb-3 flex flex-col md:flex-row gap-6 h-105 md:h-125'>

                        {/* EDITOR */}
                        <div className='w-full md:w-[60%] flex flex-col overflow-hidden min-h-0'>

                            <div className='text-sm text-gray-400'>
                                Content (Markdown)
                            </div>

                            <textarea
                                name='content'
                                value={form.content}
                                onChange={handleChange}
                                placeholder='Update your blog in markdown...'
                                className='mt-1 flex-1 p-3 text-sm resize-none outline-none overflow-y-auto min-h-0 border'
                            />

                        </div>

                        {/* PREVIEW */}
                        <div className='w-full md:w-[40%] flex flex-col overflow-hidden min-h-0'>

                            <div className='text-sm text-gray-400'>
                                Preview
                            </div>

                            <div className='mt-1 flex-1 p-3 overflow-y-auto prose max-w-none min-h-0 border'>

                                {form.content ? (
                                    <Markdown>
                                        {form.content}
                                    </Markdown>
                                ) : (
                                    <p className='text-gray-400'>
                                        Start typing to see preview
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* ACTIONS */}
                    <div className='mt-10 flex flex-col sm:flex-row gap-4'>

                        <button
                            type='submit'
                            disabled={updating}
                            className={`
                                flex-1
                                border border-black
                                px-5 py-3
                                text-sm font-medium
                                transition-all duration-200
                                ${updating
                                    ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-white hover:text-black'
                                }
                            `}
                        >
                            {updating ? 'Updating...' : 'Update Blog'}
                        </button>

                        <button
                            type='button'
                            onClick={handleDelete}
                            className='px-5 py-3 border border-red-500 bg-red-500 text-white text-sm font-medium hover:bg-white hover:text-red-500 transition-all duration-200'
                        >
                            Delete
                        </button>

                    </div>

                </form>

            </div>
        </div>
    )
}

export default EditBlog
