import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:postId").get(getComments);
router.route("/").post(protect, addComment); // Protected route

export default router;