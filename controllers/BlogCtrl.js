const { Error } = require('mongoose');
const Blog = require('../models/Blog.model');

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Handle the mainImage separately
    const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].path : null;

    // Handle additional images
    const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];

    // Create a new blog post with title, content, mainImage, images, and author
    const blog = new Blog({ 
      title, 
      content, 
      mainImage, 
      images,     
      author      
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id); 

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' }); 
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching blog' }); 
  }
};
