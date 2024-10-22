import express from "express";
import {
	addBlog,
	allBlogs,
	deleteBlog,
	getBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/add-blog", addBlog);
router.get("/blogs", allBlogs);
router.get("/get-blog/:id", getBlog);
router.delete("/delete-blog/:id", deleteBlog);

export default router;
