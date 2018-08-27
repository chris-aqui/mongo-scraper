const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
// This is similar to a Sequelize model
const CommentSchema = new Schema({
  _articleId:{
    type: Schema.Types.ObjectId,
    ref:"Article"
  },
  // `body` is of type String
  commentText: {
    type: String,
    validate: [
      function(input) {
        return input.length >= 1;
      },
      "Comment should not be blank."
    ]
  }
});

// This creates our model from the above schema, using mongoose's model method
const Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;