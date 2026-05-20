import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'

import { getBlog, updateBlog, deleteBlog } from '../api/blog.api.js'
import { useAuth } from '../context/AuthContext.jsx'
import NotFound from './NotFound.jsx'
import Header from '../components/Header.jsx'
import Input from '../components/Input.jsx'
import Loader from '../components/Loader.jsx'

const EditBlog = () => {
    const { user } = useAuth()
    const { slug } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: '',
        coverImage: null,
        content: '',
        status: 'published',
        tags: ''
    })

    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlog(slug)
                setBlog(data)

                setForm({
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    tags: data.tags?.join(', ') || '',
                    coverImage: null
                })
            } catch (err) {
                console.error(err)
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

        const formData = new FormData()

        formData.append('title', form.title)
        formData.append('content', form.content)
        formData.append('status', form.status)
        formData.append('tags', form.tags)

        if (form.coverImage) {
            formData.append('coverImage', form.coverImage)
        }

        try {
            const updated = await updateBlog(slug, formData)
            navigate(`/blogs/${updated.slug}`)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this blog?")
        if (!confirm) return

        try {
            await deleteBlog(slug)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) return <Loader />

    if (!blog) return <NotFound />



    return (
        <div>
            <Header content='Edit Blog' />

            <div className='px-5 mb-4 md:max-w-5xl md:container md:mx-auto'>

                <form className='pt-4' onSubmit={handleSubmit}>

                    {/* TITLE */}
                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Title</label>
                        <Input
                            name='title'
                            value={form.title}
                            onChange={handleChange}
                            className='px-3 text-sm mt-1 border w-full h-12'
                        />
                    </div>

                    {/* COVER IMAGE */}
                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Cover Image</label>
                        <input
                            type='file'
                            name='coverImage'
                            onChange={handleChange}
                            className='px-3 text-sm mt-1 border w-full h-12'
                        />
                    </div>

                    {/* CONTENT + PREVIEW */}
                    <div className='mb-3 flex flex-col md:flex-row gap-6'>
                        <div className='flex-1'>
                            <label className='text-sm text-gray-400'>Content</label>
                            <textarea
                                name='content'
                                value={form.content}
                                onChange={handleChange}
                                rows={10}
                                className='p-3 text-sm mt-1 border w-full'
                            />
                        </div>

                        <div className='flex-1 px-3'>
                            <h3 className='text-gray-400'>Preview</h3>
                            <div className='prose max-w-none'>
                                <Markdown>{form.content}</Markdown>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className='mt-10 flex gap-4'>
                        <button className='form-btn'>
                            Update
                        </button>

                        <button
                            type='button'
                            onClick={handleDelete}
                            className='px-5 py-2 bg-red-500 text-white rounded'
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
