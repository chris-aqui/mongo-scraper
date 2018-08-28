const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor
// Create a new UserSchema object
// This is similar to a Sequelize model
const articleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  // `summary` is required and of type String
  author: {
    type: String,
    required: true
  },
  date: String,
  // image link
  image: {
    type: String,
    required: true,
    unique: true
  },
  // defines whether or not article is saved
  saved: {
    type: Boolean,
    default: false
  }
    // required: true
  // },
  // link to comment model/table by using the ref and saving an obj id with it. it's an array of objects so that we can have many comments
  // comments: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Comment"
  // }]

});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", articleSchema);

// Export the Article model
module.exports = Article;