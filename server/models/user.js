var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs")

var UserSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    fname: String,
    lname: String,
    country: String,
    isAdmin: Boolean,
    isActive: Boolean,
});

UserSchema.methods.generateHash = function(password)
{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.validatePassword = function(password)
{
	return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', UserSchema);