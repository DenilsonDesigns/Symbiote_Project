const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Load User Model
const User = require("../models/User");

//GET- /users/test
//Tests post route
//Access- public
router.get("/test", (req, res) => {
  res.json({ msg: "Users works" });
});

//GET - /users/register
//Register a user
//Access - public
router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    //salt password

    //save user
  });
});

module.exports = router;
