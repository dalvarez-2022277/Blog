import mongoose from 'mongoose';
import Post from './Post.model.js';
import Comment from '../Coments/Coments.model.js';

export const createPost = async (req, res) => {
  try {
    const { title, description, link, imageUrl, comments, status } = req.body;
    const newPost = new Post({ title, description, link, imageUrl, comments, status });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    // Aquí utilizamos 'populate' para incluir los comentarios asociados con cada post
    const posts = await Post.find().populate('comments');
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link, imageUrl } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }
    const updatedPost = await Post.findByIdAndUpdate(id, { title, description, link, imageUrl }, { new: true });
    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }
    await Post.findByIdAndUpdate(id, { status: false });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
