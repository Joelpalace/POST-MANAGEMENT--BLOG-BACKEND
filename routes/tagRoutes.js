const express = require('express');
const { createTag, getTags } = require('../controllers/tagController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, isAdmin, createTag);
router.get('/', getTags);

module.exports = router;
