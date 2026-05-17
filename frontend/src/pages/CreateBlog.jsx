import React, { useState } from 'react'
import Header from '../components/Header'
import Input from '../components/Input'
import Markdown from 'react-markdown'

const CreateBlog = () => {
    const [form, setForm] = useState({ title: '', body: '' });

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form);
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
                        <Input id='title' className='px-3 text-sm mt-1 border w-full h-12' onChange={(e) => (setForm((prev) => ({ ...prev, title: e.target.value })))} />
                    </div>

                    <div className='mb-3 flex flex-col md:flex-row gap-6'>
                        <div className='flex-1'>
                            <label htmlFor="body" className='text-sm text-gray-400'>
                                Body (Markdown)
                            </label>
                            <textarea id="body" className='p-3 text-sm mt-1 border w-full' rows={10} onChange={(e) => (setForm((prev) => ({ ...prev, body: e.target.value })))}></textarea>
                        </div>
                        <div className='flex-1 px-3'>
                            <h3 className='text-gray-400'>Preview</h3>
                            <div className='prose max-w-none prose-headings:font-inter prose-p:font-inter'>
                                <Markdown>{form.body}</Markdown>
                            </div>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <button className='form-btn'>
                            Publish
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default CreateBlog
