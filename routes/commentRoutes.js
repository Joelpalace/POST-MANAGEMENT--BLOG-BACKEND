

const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/:postId').get(getComments);
router.route('/').post(protect, addComment);

module.exports = router;
// This code defines a router for handling comments in a blog application. It uses Express.js to create a router that handles GET and POST requests for comments. The GET request retrieves comments for a specific post, while the POST request adds a new comment to a post. The POST request is protected by authentication middleware to ensure that only authenticated users can add comments. The router is then exported for use in other parts of the application.