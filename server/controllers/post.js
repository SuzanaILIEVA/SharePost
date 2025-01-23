const PostSchema = require("../models/post.js");

const getPosts = async () => {
  try {
    const getPosts = await PostSchema.find();

    res.status(200).json(getPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE POST
const createPost = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE POST
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await PostSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE POST

const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;
    await PostSchema.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, createPost, updatePost, deletePosts };
