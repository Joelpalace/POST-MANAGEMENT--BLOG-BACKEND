/* const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');
router.route('/').post(protect, createPost).get(getAllPosts);
router.route('/search').get(searchPosts);
router.route('/:id').get(getPostById).put(protect, updatePost).delete(protect, deletePost);
module.exports = router; */

const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createPost).get(getAllPosts);
router.route('/search').get(searchPosts);
router.route('/:id').get(getPostById).put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
