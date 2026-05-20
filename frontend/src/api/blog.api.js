import api from "./axios";

export const createBlog = async (formData) => {
    const res = await api.post('/blogs', formData)
    return res.data
}

export const getBlogs = async (page = 1, limit = 10) => {
    const res = await api.get(`/blogs?page=${page}&limit=${limit}`)
    return res.data
}

export const getMyBlogs = async (page = 1, limit = 5) => {
    const res = await api.get(`/blogs/my?page=${page}&limit=${limit}`)
    return res.data
}

export const getBlog = async (slug) => {
    const res = await api.get(`/blogs/${slug}`)
    return res.data
}

export const updateBlog = async (slug, formData) => {
    const res = await api.put(`/blogs/${slug}`, formData)
    return res.data
}

export const deleteBlog = async (slug) => {
    await api.delete(`/blogs/${slug}`)
}
