const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");

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
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        //save user
        newUser
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  });
});

//GET - /users/login
//Login a user
//Access - public
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //FIND USER BY USERNAM
  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //CHECK PASSWORD
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched
        const payload = {
          //Create jwt payload
          id: user.id,
          username: user.username
        };
        //Sign token
        jwt.sign(
          payload,
          process.env.SECRET_OR_KEY || keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
