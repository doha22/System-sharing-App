const router = require('express').Router();
var express = require("express");
//const router = express.Router();
var mongoose = require('mongoose');
const session = require('express-session');


let category = require('../models/category');

let comments = require('../models/comments');



 // create category
//  const createCategory = function(cat) {
//   return category.create(cat).then(docCategory => {
//     console.log("\n>> Created Category:\n", docCategory);
//     return docCategory;
//   });
//  };

  router.route('/create_blog').post(function(req, res) {

    category.create(req.body).then(result => {
                res.status(201).json({
                    message: " Category Created  successfully!",
                        data:{ result
                    }
                });
            }).catch(err => {
                console.log(err),
                    res.status(500).json({
                        error: err
                    });
            });

  });


// create comments  based on category name and by sending category id in posting

// Route for creating a new comment and updating category "comment" field with it
router.route("/category/:id").post( function(req, res) {
  // Create a new note and pass the req.body to the entry
  comments.create(req.body)
    .then(function(result) {
      // If a comment was created successfully, find one category with an `_id` equal to `req.params.id`. Update the category to be associated with the new comment
      // { new: true } tells the query that we want it to return the updated category -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return category.findOneAndUpdate({ _id: req.params.id }, {$push: {comments: result._id}}, { new: true });
    })
    .then(function(com) {
      // If we were able to successfully update a category, send it back to the user
      res.json(com);
    })
    .catch(function(err) {
      // If an error occurred, send it to the user
      res.json(err);
    });
});





// create comments 
// router.route('/create_comment').post(function(req, res,catId) {

//     return comments.create(comment).then(docComment => {
//       console.log("\n>> Created Comment:\n", docComment);
  
//       return category.findByIdAndUpdate(
//         catId,
//         { $push: { comments: docComment._id } },
//         { new: true, useFindAndModify: false }
//       );
//     });
//  // };

// });
 




   // get full data
  //  const getTutorialWithPopulate = function(id) {
  //   return category.findById(id)
  //   .populate("comments", "-_id -__v")
  //   .populate("category", "name -_id") ;
  // };


// get all  the category 

router.route("/allCat").get( function(req,res) {
  category.find({})
  .then(function(cat) {
    res.json(cat);
  })
  .catch(function(err) {
    res.json(err);
  })
});


// get all comments 

router.route("/allComm").get(function(req,res) {
  comments.find({})
  .then(function(com) {
    res.json(com);
  })
  .catch(function(err) {
    res.json(err);
  })
});



// get all comments related to one category

router.route("/category/:id").get(function(req, res) {
  category.findOne({ _id: req.params.id })
    .populate("comments", "-_id -__v")
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});






  module.exports = router;