const Comment = require('../models/Comment');
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      post: req.body.postId,
      author: req.user._id,
      parent: req.body.parent || null
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ msg: 'Error adding comment' });
  }
};
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching comments' });
  }
};
