var mongoose = require("mongoose");

var ItemSchema = mongoose.Schema({
    
    item_name: String,
    price: Number,
    avail: Number,
    tax: Number,
    desc: String,
    comments: Array
});

module.exports = mongoose.model("Item", ItemSchema);