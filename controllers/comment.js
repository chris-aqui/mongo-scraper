// bring in the comments script
const Comment = require("../models/Comment");
const makeDate = require("../scripts/date");

module.exports = {
  // add all the comments related to the post
  get: function(data, cb){
    Comment.finc({
      _articleId:data._id
    },cb);
  },
  save: function(data, cb){
    // create an object for the new comment
    var newComment = {
      _articleId:data._id,
      data:makeDate(),
      body: data.body
    };
    // next create the comment in the db
    Comment.create(newComment, function(err,doc){
      if(err) throw err;
      console.log(doc);
      cb(doc);
    })
  },
  delete: function(data, cb){
    // rmeove comments with the id
    Comment.remove({
      _id:data._id
    }, cb);
  }
}