import Tag from "../models/Tag.js";
import errorHandler from "../utils/errorHandler.js";

export const createTag = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ msg: "Tag name and slug are required" });
    }

    const tagExists = await Tag.findOne({ slug });
    if (tagExists) {
      return res.status(400).json({ msg: "Tag already exists" });
    }

    const tag = await Tag.create({ name, slug });
    res.status(201).json(tag);
  } catch (err) {
    errorHandler(err, res);
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    errorHandler(err, res);
  }
};