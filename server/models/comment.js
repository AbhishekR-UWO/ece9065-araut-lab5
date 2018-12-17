var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
    
    forItem: String,
    comment: String,
    rating: Number,
    byUser: String,
    isActive: Boolean
});

module.exports = mongoose.model('Comment', CommentSchema);