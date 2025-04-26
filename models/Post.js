import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5 },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("Post", PostSchema);