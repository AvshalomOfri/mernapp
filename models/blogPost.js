const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

// Model
//in order to register our model we give it a name ('BlogPost') and pass in the schema to be registered
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
