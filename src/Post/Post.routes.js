  import { Router } from "express";
  import { check } from "express-validator";
  import {
    createPost,
    getPosts,
    updatePost,
    deletePost,
  } from "./Post.controller.js";

  const router = Router();

  router.get("/", getPosts);


  router.post("/", [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("link", "Link is required").not().isEmpty(),
      check("imageUrl", "Image URL is required").not().isEmpty()
    ],
    createPost
  );

  router.put("/:id", updatePost);

  router.delete("/:id", deletePost);

  export default router;