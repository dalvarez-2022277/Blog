import mongoose from "mongoose";
import Post from "./Post.model.js";
import Comments from "../Coments/Coments.model.js";
import jwt from "jsonwebtoken";

export const createPost = async (req, res) => {
  try {
    const validarToken = req.user;
    if (validarToken.role !== "admin") {
      return res.status(401).json({
        message: "El usuario no tiene permiso para crear una publicación.",
      });
    }

    const { title, description, link, imageUrl } = req.body;
    const newPost = new Post({ title, description, link, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comments.find({ idPosteo: post._id });
        return { ...post.toObject(), comments };
      })
    );

    res.json(postsWithComments);
  } catch (error) {
    console.error("Error al obtener las publicaciones y comentarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};



export const updatePost = async (req, res) => {
  try {
    const validarToken = req.user;
    if (validarToken.role !== "admin") {
      return res.status(401).json({
        message: "El usuario no tiene permiso para crear una publicación.",
      });
    }

    const postId = req.params.id; 
    const { title, description, link, imageUrl } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, description, link, imageUrl },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const validarToken = req.user;
    if (validarToken.role !== "admin") {
      return res.status(401).json({
        message: "El usuario no tiene permiso para crear una publicación.",
      });
    }
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
