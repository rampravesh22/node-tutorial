import Blog from "../models/blogModal.js";

export const addBlog = async (req, res) => {
	try {
		const blog = new Blog(req.body);
		await blog.save();
		res.json({ blog }).status(201);
	} catch (error) {
		res.json({ error }).status(400);
	}
};

export const allBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find().sort({ createdAt: -1 });
		res.json(blogs).status(200);
	} catch (error) {
		res.json(error).status(400);
	}
};

export const getBlog = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);
		res.json(blog).status(200);
	} catch (error) {
		res.json(error).status(400);
	}
};

export const deleteBlog = async (req, res) => {
	try {
		const res = await Blog.findByIdAndDelete(req.params.id);
		console.log(res);
		res.json(res).status(200);
	} catch (error) {
		res.json(error).status(400);
	}
};
