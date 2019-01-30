const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//POST MODEL
const Post = require("../models/Post");

//GET- posts/test
//Tests post route
//Access- public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts works" });
});

//GET- posts
//GET POST
//Access- Public
router.get("/", (req, res) => {
  Post.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(404).json({ error: "No Posts found" });
    });
});

//POST- posts
//Create post
//Access- private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.title || !req.body.body) {
      return res.status(404).json({ error: "Title and body required" });
    }
    const newPost = new Post({
      user: req.user.id,
      title: req.body.title,
      body: req.body.body
    });
    newPost.save().then(post => res.json(post));
  }
);

//GET- posts/:id
//GET POST by id
//Access- Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ error: "No post found matching the id" })
    );
});

//EXPORT///
module.exports = router;
