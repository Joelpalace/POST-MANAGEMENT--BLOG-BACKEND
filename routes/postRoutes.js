import express from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts } from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createPost) // Protected route
  .get(getAllPosts);

router.route("/search").get(searchPosts);

router.route("/:id")
  .get(getPostById)
  .put(protect, updatePost) // Protected route
  .delete(protect, deletePost); // Protected route

export default router;