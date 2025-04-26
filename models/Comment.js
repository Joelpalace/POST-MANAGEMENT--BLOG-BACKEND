import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }
}, { timestamps: true });

export default mongoose.model("Comment", CommentSchema);