import { Router } from "express";
import { check } from "express-validator";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "./Post.controller.js";
import { validarJWT } from "../helpers/validarJwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", getPosts);

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("link", "Link is required").not().isEmpty(),
    check("imageUrl", "Image URL is required").not().isEmpty(),
    validarJWT,
    validarCampos,
  ],
  createPost
);

router.put("/:id", [validarCampos,validarJWT], updatePost);

router.delete("/:id",[validarCampos,validarJWT], deletePost);

export default router;
