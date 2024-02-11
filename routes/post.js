const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");

router.get("/", postController.homePage);

router.get("/post", postController.postPage);

router.get("/post/:id", postController.postDetailsPage);

module.exports = router;
