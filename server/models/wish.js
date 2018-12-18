var mongoose = require("mongoose");

var WishSchema = mongoose.Schema({
    
    list_name: String,
    byUser: String,
    isPrivate: Boolean,
    list_desc: String,
    list_items: Array
});


module.exports = mongoose.model('Wish', WishSchema);