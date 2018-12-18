var jwt = require("jsonwebtoken");
var User = require('../models/user');
var Comment = require("../models/comment");
var Item = require("../models/items");
var Cart = require("../models/cart");
var Wish = require("../models/wish");
var config = require("../config/dbConfig");
var bcrypt = require("bcrypt-nodejs");


// User register API;
exports.register = (req, res) => {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please enter valid email and/or password.'});
  } else {
      
    // create new user and store in db;
    let hash  =	bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);

    var newUser = new User({
        email: req.body.email,
        password: hash,
        fname: req.body.fname,
        lname: req.body.lname,
        country: req.body.country,
        isAdmin: false,
        isActive: true
    });
    // save the user;
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Email already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
}


// User login API ;
exports.login = (req, res) => {
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log(err);
        }
        if(!user) {
            res.json({success: false, msg: 'Authentication failed. User not found.'});
        }else if(user.isActive === false){
            res.json({success: false, msg: 'Login is Blocked. Please contact store manager'});
        }else if(!user.validatePassword(req.body.password)) {
            res.json({success: false, msg: 'Authentication failed. Wrong password.'});
        }else {
            var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'Bearer ' + token});
        }
  });
}

exports.adminLogin = (req, res) => {
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log(err);
        }
        if(!user) {
            res.json({success: false, msg: 'Authentication failed. User not found.'});
        }else if(user.isActive === false || user.isAdmin === false){
            res.json({success: false, msg: 'Login is Blocked. Please contact store manager'});
        }else if(!user.validatePassword(req.body.password)) {
            res.json({success: false, msg: 'Authentication failed. Wrong password.'});
        }else {
            var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'Bearer ' + token});
        }
  });
}

exports.addItem = (req, res) => {
   let autho = req.headers.authorization;
   autho = autho.split(' ');
   console.log(autho);
  let decoded = jwt.verify(autho[1], config.secret);
  
  Item.findOne({item_name: req.body.item_name}, (err, item) => {
      if(err) {
          console.log(err);
      }
      if(item) {
          res.json({success: false, msg: 'Item Already Exists in Cart. Please use Update !!'});
      }else {
          let newItem = new Item({
              item_name: req.body.item_name,
              price: req.body.price,
              tax: req.body.tax,
              avail: req.body.avail,
              desc: req.body.desc
          });
          
          newItem.save((err) => {
              if(err) {
                  res.json({success: false, msg: 'Something went wrong. Please contact support !!'});
              }else {
                  res.json({success: true, msg: ' Item added to DB successfully !!'});
              }
          });
      }
  });
}

exports.search_game = (req, res) => {
    Item.findOne({'item_name': req.body.search_game}, (err, item) => {
        if(err) {
            console.log(err)
        }
        if(!item) {
            res.json({success: false, msg: 'No Item of this name present in DB. Please check the name or add new item'});
        }else {
            res.json({success: true, msg: item});
        }
    });
}

exports.updateItem = (req, res) => {
   Item.updateOne({'id': req.body.id}, {$set: {'item_name': req.body.item_name, 'price': req.body.price, 'tax': req.body.tax, 'avail': req.body.avail, 'desc': req.body.desc}}, (err, item) => {
       if(err) {
           console.log(err)
       }if(!item) {
           res.json({success: false, msg: 'Item could not be updated !!'});
       }else {
           res.json({success: true, msg: 'Item updated Sucessfully !!!'});
       }
   } );
}

exports.deleteItem = (req, res) => {
    Item.deleteOne({'id': req.body.id}, (err, result) => {
        if(err) {
            console.log(err);
        }
        if(!result) {
            res.json({success: false, msg: 'Item could not be deleted. Please try again !!!'})
        }
        if(result) {
            res.json({success: true, msg: ' Item Deleted successfully !!'});
        }
    })
}

exports.getAll = (req, res) => {
    Item.find((err, items) => {
        if(err) {
            console.log(err)
        }
        if(items.length < 0) {
            res.json({success: false, msg: 'No Items in the database'})
        }else {
            res.json({success: true, msg: items})
        }
    });
}

exports.createWishList = (req, res) => {
    let autho = req.headers.authorization;
    autho = autho.split(' ');
    let decoded = jwt.verify(autho[1], config.secret);
  
  Wish.findOne({'list_name': req.body.list_name, 'byUser': decoded.email}, (err, list) => {
      if(err) {
          console.log(err)
      }
      if(list) {
          res.json({success: false, msg: 'List with this name already exists'});
      }else {
          const newWish = new Wish({
              'list_name': req.body.list_name,
              'byUser': decoded.email,
              'list_desc': req.body.list_desc,
              'isPrivate': req.body.isPrivate
          });
          
          newWish.save((err) => {
              if(err) {
                  res.json({success: false, msg: 'Error while saving the wish list'})
              }else {
                  res.json({success: true, msg: ' Wish list Created'});
              }
          });
      }
  });
}

exports.searchAllWish = (req, res) => {
    let autho = req.headers.authorization;
   autho = autho.split(' ');
   console.log(autho);
  let decoded = jwt.verify(autho[1], config.secret);
  
  Wish.find({'byUser': decoded.email}, (err, items) => {
      if(err) {
          console.log(err)
      }
      if(items.length <= 0) {
          res.json({success: false, msg: 'No Wish Lists for current user'})
      }else {
          res.json({success: true, msg: items});
      }
  });
}

exports.addToWish = (req, res) => {
     let autho = req.headers.authorization;
   autho = autho.split(' ');
  let decoded = jwt.verify(autho[1], config.secret);
  
  Wish.findOne({'byUser': decoded.email, 'list_name': req.body.list_name}, (err, list) => {
      if(err) {
          console.log(err)
      }
      if(!list) {
          res.json({success: false, msg: 'No list found for this user'});
      }else {
          req.body.items.forEach((element) => {
              list.list_items.push(element);
          });
          
          list.save((err) => {
              if(err) throw err;
              res.json({success: true, msg: ' Item added to the list'});
          });
      }
  });
}