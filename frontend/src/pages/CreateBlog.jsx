import { useState } from 'react';
import Markdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../api/blog.api.js';
import { useAuth } from '../context/AuthContext';
import PageTitle from '../components/PageTitle';
import { toast } from '../utils/toast.jsx';

const CreateBlog = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: '',
        coverImage: null,
        content: '',
        status: 'published',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.title || !form.content) {
            toast('Title and content are required', false);
            return
        }

        setLoading(true)

        try {
            const formData = new FormData();

            formData.append('title', form.title);
            formData.append('coverImage', form.coverImage);
            formData.append('content', form.content);
            formData.append('status', form.status);
            formData.append('author', user?.id);

            const data = await createBlog(formData);

            toast('Blog published successfully');

            navigate(`/blogs/${data.slug}`);
        } catch (error) {
            toast(error?.response?.data?.message || 'Failed to publish blog', false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <PageTitle content='Create a new Blog' />

            <div className='px-5 mb-4 md:max-w-5xl md:container md:mx-auto py-8'>
                <div className='py-4 text-center text-sm text-gray-500'>
                    <p>Share your thoughts.</p>
                </div>

                <form className='pt-4' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='text-sm text-gray-400'>Title</label>
                        <input
                            name='title'
                            value={form.title}
                            onChange={handleChange}
                            className='px-3 text-sm mt-1 border w-full h-12 outline-none'
                            placeholder='Enter blog title...'
                        />
                    </div>

                    <div className="mb-3">
                        <label className="text-sm text-gray-400">Cover Image</label>

                        <div className="mt-1 flex items-center justify-between border px-3 h-12 bg-white">
                            <input
                                type="file"
                                name="coverImage"
                                onChange={handleChange}
                                className="text-sm w-full"
                            />

                            {form.coverImage && (
                                <span className="text-xs text-gray-500 truncate max-w-30">
                                    {form.coverImage.name}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-3 flex flex-col md:flex-row gap-6 h-105 md:h-125">

                        <div className="w-full md:w-[60%] flex flex-col overflow-hidden min-h-0">

                            <div className="text-sm text-gray-400">
                                Content (Markdown)
                            </div>

                            <textarea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                placeholder="Write your blog in markdown..."
                                className="mt-1 flex-1 p-3 text-sm resize-none outline-none overflow-y-auto min-h-0 border"
                            />
                        </div>

                        <div className="w-full md:w-[40%] flex flex-col overflow-hidden min-h-0">

                            <div className="text-sm text-gray-400">
                                Preview
                            </div>

                            <div className="mt-1 flex-1 p-3 overflow-y-auto prose max-w-none min-h-0 border">
                                {form.content ? (
                                    <Markdown>{form.content}</Markdown>
                                ) : (
                                    <p className="text-gray-400">
                                        Start typing to see preview
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className='mt-10'>
                        <div className="mt-10 flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`form-btn w-full transition-all duration-200 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.01]'
                                    }`}
                            >
                                {loading ? 'Publishing...' : 'Publish'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog
