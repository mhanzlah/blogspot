import slugify from "slugify";
import Blog from "../models/Blog.js";

const generateSlug = async (title) => {
    let slug = slugify(title, { lower: true, strict: true, });

    const existing = await Blog.findOne({ slug });
    if (existing) {
        slug = `${slug}-${Date.now()}`;
    }

    return slug
}

export const createBlog = async (req, res) => {
    try {
        const { title, content, tags, status } = req.body;

        const slug = await generateSlug(title);

        const excerpt = content.substring(0, 150).trimEnd() + "...";

        const coverImage = req.file ? req.file.path : undefined;

        let parsedTags = [];

        if (tags) {
            try {
                parsedTags = JSON.parse(tags);
            } catch (err) {
                parsedTags = [];
            }
        }

        const blog = await Blog.create({
            title,
            slug,
            content,
            excerpt,
            coverImage,
            tags: parsedTags,
            status: status || "draft",
            author: req.user._id,
        });

        return res.status(201).json(blog);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const { pageString, limitString } = req.query;

        const page = parseInt(pageString) || 1;
        const limit = parseInt(limitString) || 9;

        const skip = (page - 1) * limit;

        const totalBlogs = await Blog.countDocuments({
            status: "published",
        });

        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find({ status: "published" })
            .populate("author", "username avatar")
            .sort({ createdAt: -1 })
            .select("-content")
            .skip(skip)
            .limit(limit);

        res.json({
            blogs, pagination: {
                total: totalBlogs,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate("author", "username avatar");

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.status === "draft" && (!req.user || req.user.id.toString() !== blog.author._id.toString())) {
            return res.status(403).json({ message: "This blog is not published yet" });
        }

        res.json(blog);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getMyBlogs = async (req, res) => {
    try {
        const { pageString, limitString } = req.query;

        const page = parseInt(pageString) || 1;
        const limit = parseInt(limitString) || 9;

        const skip = (page - 1) * limit;

        const totalBlogs = await Blog.countDocuments({
            author: req.user.id,
        });

        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find({ author: req.user.id })
            .populate("author", "username avatar")
            .sort({ createdAt: -1 })
            .select("-content")
            .skip(skip)
            .limit(limit);

        res.json({
            blogs, pagination: {
                total: totalBlogs,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed - you are not the author" });
        }

        const { title, content, tags, status } = req.body;

        if (title && title !== blog.title) {
            blog.slug = await generateSlug(title);
            blog.title = title;
        }

        if (content) {
            blog.content = content;
            blog.excerpt = content.substring(0, 150).trimEnd() + "...";
        }

        if (req.file) {
            blog.coverImage = req.file.path;
        }

        if (tags) blog.tags = JSON.parse(tags);

        if (status) blog.status = status;

        await blog.save();

        return res.json(blog);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed - you are not the author" });
        }

        await blog.deleteOne();

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
