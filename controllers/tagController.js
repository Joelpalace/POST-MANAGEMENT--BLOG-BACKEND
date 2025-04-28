const Tag = require('../models/Tag');
exports.createTag = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating tag' });
  }
};
exports.getTags = async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
};