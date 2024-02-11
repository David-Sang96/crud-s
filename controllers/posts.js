const Post = require("../models/post");

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  Post.create({ title, description, imgUrl: photo })
    .then(res.redirect("/"))
    .catch((e) => console.log(e));
};

exports.createForm = (req, res) => {
  res.render("addPost", {
    title: "Add Post",
  });
};

exports.homePage = (req, res) => {
  Post.findAll({ order: [["createdAt", "desc"]] })
    .then((posts) => {
      console.log("data post", posts);
      res.render("home", { title: "Home", posts });
    })
    .catch((e) => console.log(e));
};

exports.postPage = (req, res) => {
  res.render("post", {
    title: "Post",
  });
};

exports.postDetailsPage = (req, res) => {
  const id = req.params.id;
  // Post.findByPk(id)
  Post.findOne({ where: { id } })
    .then((post) => {
      res.render("details", {
        title: "Detail",
        post,
      });
    })
    .catch((e) => console.log(e));
};

exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then((post) => {
      if (!post) {
        res.redirect("/");
      }
      return post.destroy();
    })
    .then(res.redirect("/"))
    .catch((e) => console.log(e));
};

exports.getOldPost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then((post) => {
      res.render("editPost", {
        title: `${post.title}`,
        post,
      });
    })
    .catch((e) => console.log(e));
};

exports.editPost = (req, res) => {
  const id = req.params.id;
  const { title, description, photo } = req.body;
  Post.findByPk(id)
    .then((post) => {
      (post.title = title),
        (post.description = description),
        (post.imgUrl = photo);
      return post.save();
    })
    .then(res.redirect("/"))
    .catch((e) => console.log(e));
};
