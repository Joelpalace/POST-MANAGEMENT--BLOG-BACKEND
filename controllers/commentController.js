import Comment from "../models/Comment.js";
import errorHandler from "../utils/errorHandler.js";

export const addComment = async (req, res) => {
    try {
        const { content, postId, parent } = req.body;
        
        const comment = await Comment.create({
            content,
            post: postId,
            author: req.user._id,
            parent: parent || null,
        });

        res.status(201).json(Comment);
    } catch (err) {
        errorHandler(err, res);
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate("author", "username")
            .populate("post", "title")
            .sort({ createdAt: -1 });
            
        res.status(200).json(comments);
    } catch (err) {
        errorHandler(err, res);
    }
};