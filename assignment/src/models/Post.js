const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    date: { type: Date, Default: new Date() },
    author: { type: String },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
module.exports = Post;
