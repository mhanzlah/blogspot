import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlog, getBlogsByAuthor, getMyBlogs, updateBlog } from "../controllers/blog.controller.js";
import { protect } from "../middlewares/protect.js";
import { optionalAuth } from "../middlewares/optionalAuth.js"
import upload from "../middlewares/upload.js";


const blogRouter = Router();

blogRouter.post("/", protect, upload.single("coverImage"), createBlog);
blogRouter.get("/", optionalAuth, getAllBlogs);
blogRouter.get("/author/:authorId", optionalAuth, getBlogsByAuthor);
blogRouter.get("/my", protect, getMyBlogs);
blogRouter.get("/:slug", optionalAuth, getBlog);
blogRouter.put("/:slug", protect, upload.single("coverImage"), updateBlog);
blogRouter.delete("/:slug", protect, deleteBlog);

export default blogRouter;
