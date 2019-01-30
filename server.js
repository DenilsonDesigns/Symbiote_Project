const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

//Routes
const users = require("./routes/users");
const posts = require("./routes/posts");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to DB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
//PASSPORT CONFIG
require("./config/passport")(passport);

//Use routes

//use routes
app.use("/users", users);
app.use("/posts", posts);
///////////

//SERVE STATIC ASSETS IF IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  //SET STATIC FOLDER
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//PORT CONNECTION
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
