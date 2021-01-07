const Post = require("../models/Post");

exports.getPostById = (req, res, next, id) => {
  Post.findById(id)
    .populate("user")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: " No post was found in DB",
        });
      }

      req.postProfile = post;

      console.log(req.postProfile);
      next();
    });
};

exports.getPost = (req, res) => {
  return res.json(req.postProfile);
};
exports.getPosts = (req, res) => {
  Post.find().exec((err, found) => {
    if (err) {
      return res.status(400).json({
        error: "Posts Not Found",
      });
    }
    res.json(found);
  });
};

exports.createPost = (req, res) => {
  const newPost = new Post(req.body);
  newPost.save((err, post) => {
    console.log(err);
    if (err) {
      return res.status(400).json({
        error: "Error creating your post",
      });
    }

    res.json({ post });
  });
};

exports.getPostBySlug = (req, res) => {
  const post = Post.findOne({ slug: req.param.slug }, (err, found) => {
    // console.log(found);
    if (err) {
      return res.status(400).json({
        error: "Error finding the post",
      });
    }
    res.json(found);
  });
};

exports.updatePost = (req, res) => {
  const { image, title, description, markdown } = req.body;
  Post.findOneAndUpdate(
    { _id: req.params.id },
    { image, title, description, markdown }
  );
};

exports.deletePost = (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id });
  res.status(200).send({ message: "Post deleted successfully" });
};

exports.getUsersPostByUsername = (req, res) => {
  Post.find({ user: req.postProfile.user.username }).exec((err, found) => {
    if (err) {
      return res.status(400).json({
        error: "NO posts found",
      });
    }
    res.json({ found });
  });
};
