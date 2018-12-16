var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
    
    forItem: String,
    comment: String,
    rating: Number,
    byUser: String
});

module.exports = mongoose.model('Comment', CommentSchema);