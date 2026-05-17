import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import Markdown from 'react-markdown'

const Blog = () => {
    const { slug } = useParams();

    const blog = {

        title: 'Blog 1',
        slug,
        coverImage: 'https://picsum.photos/800/400?random=42',
        excerpt: 'lorem ipsum dolor sit amet...',
        body: `
# lorem ipsum 1

## dolor sit amet

### come back later
`,
        readTime: '1 minute',
        author: {
            username: 'johndoe'
        },
        createdAt: 'May 17, 2026 3:26 pm',

    };

    return (
        <div>
            <Header content={blog.title} />

            <div className='px-5 py-8 md:max-w-5xl md:mx-auto md:container'>
                <div className='grid grid-cols-4'>
                    <div className='col-span-3'>
                        <div>
                            <img src={blog.coverImage} className='w-full object-contain' />
                        </div>
                        <div className='mt-4 prose max-w-none prose-headings:font-inter prose-p:font-inter'>
                            <Markdown>
                                {blog.body}
                            </Markdown>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog
