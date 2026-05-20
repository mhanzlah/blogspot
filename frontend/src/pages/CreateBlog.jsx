import { useState } from 'react'
import Markdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'

import { createBlog } from '../api/blog.api.js'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import Input from '../components/Input'

const CreateBlog = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: '',
        coverImage: null,
        content: '',
        status: 'published',
        author: ''
    });

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
        formData.append('coverImage', form.coverImage)
        formData.append('content', form.content)
        formData.append('status', form.status)
        formData.append('tags', form.tags)
        formData.append('author', user.id)

        try {
            const data = await createBlog(formData)
            navigate(`/blogs/${data.slug}`)
        } catch (error) {
            console.error(error.message);
        }

    }

    return (
        <div>
            <Header content='Create a new Blog' />

            <div className='px-5 mb-4 md:max-w-5xl md:container md:mx-auto'>
                <div className='py-12 text-center text-sm'>
                    <p>
                        Share your thoughts.
                    </p>
                </div>

                <form className='pt-4' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="title" className='text-sm text-gray-400'>
                            Title
                        </label>
                        <Input
                            id='title'
                            className='px-3 text-sm mt-1 border w-full h-12'
                            name='title'
                            value={form.title}
                            onChange={handleChange} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="coverImage" className='text-sm text-gray-400'>
                            Cover Image
                        </label>
                        <input
                            type='file'
                            id='coverImage'
                            className='px-3 text-sm mt-1 border w-full h-12'
                            name='coverImage'
                            onChange={handleChange} />
                    </div>

                    <div className='mb-3 flex flex-col md:flex-row gap-6'>
                        <div className='flex-1'>
                            <label htmlFor="content" className='text-sm text-gray-400'>
                                Content (Markdown)
                            </label>
                            <textarea
                                id="content"
                                className='p-3 text-sm mt-1 border w-full'
                                rows={10}
                                name='content'
                                value={form.content}
                                onChange={handleChange}></textarea>
                        </div>
                        <div className='flex-1 px-3'>
                            <h3 className='text-gray-400'>Preview</h3>
                            <div className='prose max-w-none prose-headings:font-inter prose-p:font-inter'>
                                {form.content ? <Markdown>{form.content}</Markdown> : <p>Start typing to see the preview</p>}
                            </div>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <button className='form-btn'>
                            Publish
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default CreateBlog
