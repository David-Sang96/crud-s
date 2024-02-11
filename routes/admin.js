const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");

router.get("/create-post", postController.createForm);

router.post("/", postController.createPost);

router.post("/post/:id", postController.deletePost);

router.get("/post-edit/:id", postController.getOldPost);

router.post("/post-edit/:id", postController.editPost);

module.exports = { adminRouter: router };
