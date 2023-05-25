const Post = require("../models/Post");

exports.createPost = async (req, res, next) => {
  let { title, content } = req.body;
  let email = req.email;

  try {
    let Post = new Post({ title, content, author: email });
    await Post.save();

    res.status(201).json({
      success: true,
      message: "Post saved successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

exports.singlePost = async (req, res, next) => {
  let id = req.params.id;
  let query = { _id: id };
  try {
    let post = await Post.findOne(query);

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

exports.myPostList = async (req, res, next) => {
  let email = req.email;
  try {
    let postList = await Post.aggregate([
      { $match: { email: email } },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          createdAt: {
            $dateToString: {
              date: "$createdAt",
              format: "%d-%m-%Y",
            },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: postList,
    });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

exports.postList = async (req, res, next) => {
  try {
    let postList = await Post.find();

    res.status(200).json({
      success: true,
      data: postList,
    });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

exports.deletePost = async (req, res, next) => {
  let id = req.params.id;

  try {
    let query = { _id: id };
    await Post.findOneAndDelete(query);
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

exports.updatePost = async (req, res, next) => {
  let id = req.params.id;

  try {
    let query = { _id: id };
    let body = req.body;
    await Post.findOneAndUpdate(query, body);
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};
