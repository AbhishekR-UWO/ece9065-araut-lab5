var jwt = require("jsonwebtoken");
var User = require('../models/user');

var config = require("../config/dbConfig");
var bcrypt = require("bcrypt-nodejs");


// User register API
exports.register = (req, res) => {
    if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    let hash  =	bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);

    var newUser = new User({
        email: req.body.email,
        password: hash
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
}


// User login API 
exports.login = (req, res) => {
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log(err);
        }
        if(!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        }
        if(!user.validatePassword(req.body.password)) {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }else {
            var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'Bearer ' + token});
        }
  });
}
