import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            default: "https://placehold.co/800x400",
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
        tags: [String],
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
