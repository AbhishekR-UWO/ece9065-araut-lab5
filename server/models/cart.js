var mongoose = require("mongoose");

var CartSchema = mongoose.Schema({
    
    item_list: Array,
    forUser: String,
    grand_total: Number
});


module.exports = mongoose.model("Cart", CartSchema);
