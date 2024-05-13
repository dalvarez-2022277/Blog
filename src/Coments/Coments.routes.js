import { Router } from "express";
import { check } from "express-validator";
import {
  createComment,
  getCommentsByPost,
  getComment,
  updateComment,
  deactivateComment,
} from "./Coments.controller.js";

const router = Router();

router.get("/:postId", getCommentsByPost);

router.get("/comment/:id", getComment);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("comment", "Comment text is required").not().isEmpty(),
    check("postId", "Post ID is required").not().isEmpty(),
  ],
  createComment
);

router.put(
  "/:id",
  [
    check("name", "Name is required").not().isEmpty(),
    check("comment", "Comment text is required").not().isEmpty(),
  ],
  updateComment
);

router.put("/deactivate/:id", deactivateComment);

export default router;
