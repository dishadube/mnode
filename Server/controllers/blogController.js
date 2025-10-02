import Blog from '../models/Blog.js';


export const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const blog = await Blog.create({ title, content, author });
        res.json({ msg: "Blog created successfully", blog });
    } catch (error) {
        res.status(400).json({ msg: "Error creating blog", error: error.message });
    }
};


export const getBlogs = async (req, res) => {
    const blogs = await Blog.find().populate('author', 'name email');
    res.json(blogs);
};

//blogController.js






