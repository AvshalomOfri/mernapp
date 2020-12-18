const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogPost");

////routes

//retrieve all documents from db
router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error.message);
    });
});

//save a new submit to db
router.post("/save", (req, res) => {
  console.log(JSON.stringify(req.body));
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry, internal server errors" });
      return;
    }
    // BlogPost
    return res.json({
      msg: "Your data has been saved!",
    });
  });
});

//delete a doc from db
router.delete("/delete", (req, res) => {
  const data = req.body.id;
  BlogPost.deleteOne({ _id: data }, function (err) {
    if (err) {
      console.log("error");
    } else {
      console.log("document successfully deleted");
    }
  });
  res.json("deleted " + data);
});

// router.delete("/delete", (req, res) => {
//   BlogPost.remove({ _id: req.body.id }, {}, function (err, numRemoved) {
//     if (err) {
//       res.end();
//       return;
//     }
//     res.json("item deleted");
//   });

//   //   console.log(request.id);
// });
module.exports = router;
