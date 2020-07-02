const mongoose = require("mongoose");

// Category-Comments: One-to-Many 

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    title: String,
    question: String ,
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
      ],

  })
);




module.exports = Category;