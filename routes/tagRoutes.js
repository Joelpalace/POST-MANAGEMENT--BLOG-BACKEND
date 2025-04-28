const express = require('express');
const router = express.Router();
const { createTag, getTags } = require('../controllers/tagController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
router.post('/', protect, isAdmin, createTag);
router.get('/', getTags);
module.exports = router;