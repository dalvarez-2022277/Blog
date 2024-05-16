import { response, request } from "express";
import commentsModel from "./Coments.model.js";
import publicationsModel from "../Post/Post.model.js";

export const createComment = async (req = request, res = response) => {
  const { comment } = req.body;
  const { idPost } = req.params;

  try {
    const userValidate = req.user;
    const newComment = new commentsModel({
      idUser: userValidate._id,
      userNameCom: userValidate.username,
      comment,
      idPosteo: idPost,
    });

    const savedComment = await newComment.save();
    const commentIds = savedComment._id;
    const postId = savedComment.idPosteo;
    const post = await publicationsModel.findByIdAndUpdate(
      postId,
      { $push: { commentId: commentIds } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ msg: "Publicación no encontrada" });
    }

    res.status(200).json({ msg: "coment allaned", comment: savedComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editComment = async (req = request, res = response) => {
  const { idPost, idComment } = req.params;
  const { comment } = req.body;

  try {
    const commentToUpdate = await commentsModel.findById(idComment);

    if (!commentToUpdate) {
      return res.status(404).json({ msg: "Comentario no encontrado" });
    }

    if (commentToUpdate.idUser.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ msg: "No tienes permiso para editar este comentario" });
    }

    const updatedComment = await commentsModel.findByIdAndUpdate(
      idComment,
      { comment },
      { new: true }
    );

    res
      .status(200)
      .json({ msg: "Comentario editado", comment: updatedComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteComment = async (req = request, res = response) => {
  const { idPost, idComment } = req.params;

  try {
    const commentToDelete = await commentsModel.findById(idComment);

    if (!commentToDelete) {
      return res.status(404).json({ msg: "Comentario no encontrado" });
    }
    if (commentToDelete.idUser.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ msg: "No tienes permiso para eliminar este comentario" });
    }
    await commentsModel.findByIdAndUpdate(idComment, { stateComment: falseF });

    res.status(200).json({ msg: "Comentario eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
