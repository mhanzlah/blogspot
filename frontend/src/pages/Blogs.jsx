import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

import { Link } from 'react-router-dom'

const BlogCard = ({ blog, index, total }) => {
    const cols = 4;

    const isRightEdge = (index + 1) % cols === 0;
    const isLastRow = index >= total - (total % cols || cols);

    return (
        <Link
            to={blog.slug}
            className={`
                block
                border-b border-r
                ${isRightEdge ? 'border-r-0' : ''}
                ${isLastRow ? 'border-b-0' : ''}
            `}
        >
            <img
                src={blog.coverImage}
                className='w-full h-40 object-cover'
            />

            <div className='mt-3 p-5'>
                <h2 className='font-semibold'>{blog.title}</h2>
                <p className='text-sm text-gray-500'>{blog.excerpt}</p>
            </div>
        </Link>
    )
}

const Blogs = () => {

    const categories = [
        {
            name: 'Technology',
            blogs: [
                {
                    title: 'Blog 1',
                    slug: 'blog-1',
                    coverImage: 'https://picsum.photos/800/400?random=1',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
                {
                    title: 'Blog 2',
                    slug: 'blog-2',
                    coverImage: 'https://picsum.photos/800/400?random=2',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
                {
                    title: 'Blog 3',
                    slug: 'blog-3',
                    coverImage: 'https://picsum.photos/800/400?random=3',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
                {
                    title: 'Blog 4',
                    slug: 'blog-4',
                    coverImage: 'https://picsum.photos/800/400?random=4',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
                {
                    title: 'Blog 5',
                    slug: 'blog-5',
                    coverImage: 'https://picsum.photos/800/400?random=5',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
                {
                    title: 'Blog 6',
                    slug: 'blog-6',
                    coverImage: 'https://picsum.photos/800/400?random=6',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
                {
                    title: 'Blog 7',
                    slug: 'blog-7',
                    coverImage: 'https://picsum.photos/800/400?random=7',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
            ],
        },
        {
            name: 'Fiction',
            blogs: [
                {
                    title: 'Blog 1',
                    slug: 'blog-1',
                    coverImage: 'https://picsum.photos/800/400?random=1',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
                {
                    title: 'Blog 2',
                    slug: 'blog-2',
                    coverImage: 'https://picsum.photos/800/400?random=2',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
                {
                    title: 'Blog 3',
                    slug: 'blog-3',
                    coverImage: 'https://picsum.photos/800/400?random=3',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
                {
                    title: 'Blog 4',
                    slug: 'blog-4',
                    coverImage: 'https://picsum.photos/800/400?random=4',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
                {
                    title: 'Blog 5',
                    slug: 'blog-5',
                    coverImage: 'https://picsum.photos/800/400?random=5',
                    excerpt: 'lorem ipsum dolor sit amet...',
                    body: '#lorem ipus\n##dolor sit amet\n###come back later',
                    readTime: '1 minute',
                    author: {
                        username: 'johndoe'
                    },
                    createdAt: 'May 17, 2026 3:26 pm',
                },
            ],
        },
    ];

    return (
        <div>
            <div>
                {categories.map(({ name, blogs }, idx) => (
                    <div key={idx} className={idx !== 0 ? 'border' : ''}>
                        <Header content={name} className='not-first:border-t' />
                        <div className='grid grid-cols-1 md:grid-cols-4'>
                            {blogs.map((blog, idx) => (
                                <BlogCard blog={blog} index={idx} total={blogs.length} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Blogs
