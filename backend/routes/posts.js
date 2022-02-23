const express = require("express");

const router = express.Router();
//capital to indicate the object
const Post = require('../models/post');

router.post("", (req,res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  //auto generate the query and save the post into the db
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added sucessfully',
      postId: createdPost._id
    });
  });
});

//update an existing resource by app.patch
//or add a new one by app.put
router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  //use mongoose to update
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});


router.get('',(req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched sucesfully!',
        posts: documents
      });
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.body.id).then(post => {
    if (post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message: 'Post not found!'});
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!" });
  });
});


module.exports = router;
