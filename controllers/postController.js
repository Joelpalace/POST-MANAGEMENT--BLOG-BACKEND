/* const Post = require('../models/Post');
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user._id });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating post' });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Error retrieving posts' });
  }
};
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Error retrieving post' });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating post' });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ msg: 'Not authorized' });
    await post.deleteOne();
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting post' });
  }
};
exports.searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await Post.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { content: new RegExp(q, 'i') }
      ]
    }).populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Search failed' });
  }
}; */

const Post = require('../models/Post');
const paginate = require('../utils/paginate');

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user._id });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { skip, limit: pageLimit } = paginate(page, limit);
    const posts = await Post.find()
      .skip(skip)
      .limit(pageLimit)
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to update this post');
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to delete this post');
    }
    await post.deleteOne();
    res.json({ msg: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.searchPosts = async (req, res, next) => {
  try {
    const { q } = req.query;
    const posts = await Post.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { content: new RegExp(q, 'i') }
      ]
    }).populate('author', 'username');
    res.json(posts);
  } catch (err) {
    next(err);
  }
};
