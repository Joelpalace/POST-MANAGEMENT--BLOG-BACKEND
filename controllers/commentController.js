
const Comment = require('../models/Comment');
const paginate = require('../utils/paginate');

exports.addComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      post: req.body.postId,
      author: req.user._id,
      parent: req.body.parent || null
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { skip, limit: pageLimit } = paginate(page, limit);
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageLimit);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};
