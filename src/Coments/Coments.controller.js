import mongoose from 'mongoose';
import Comment from './Coments.model.js';
import Post from '../Post/Post.model.js';

export const createComment = async (req, res) => {
    try {
        const { postId, name, comment } = req.body;  
        const newComment = new Comment({ name, comment, postId }); 
        await newComment.save();
    
        await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  
export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(404).send("Invalid post ID");
        }
        const comments = await Comment.find({ postId: postId, status: true });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, comment } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(id, { name, comment }, { new: true });
        if (!updatedComment) {
            return res.status(404).send('Comment not found');
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deactivateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deactivatedComment = await Comment.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!deactivatedComment) {
            return res.status(404).send('Comment not found');
        }
        res.status(200).json(deactivatedComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
