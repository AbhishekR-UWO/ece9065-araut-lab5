var mongoose = require("mongoose");

var CartSchema = mongoose.Schema({
    
    item_list: [{
        item_name: String,
        item_avail: Number,
        item_price: Number,
        item_tax: Number,
        buy: Number
        }],
    forUser: String,
    grand_total: Number
});


module.exports = mongoose.model("Cart", CartSchema);
