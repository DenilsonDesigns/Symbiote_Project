const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    require: true
  },
  body: {
    type: String
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
