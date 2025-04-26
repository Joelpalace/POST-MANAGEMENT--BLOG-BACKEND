import express from "express";
import { createTag, getTags } from "../controllers/tagController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, createTag); // Admin-only route
router.get("/", getTags);

export default router;
// This code defines the routes for managing tags in a blog application. It includes a route to create a new tag, which is protected and only accessible to admin users, and a route to retrieve all tags, which is publicly accessible. The routes are defined using Express.js and utilize middleware for authentication and authorization.