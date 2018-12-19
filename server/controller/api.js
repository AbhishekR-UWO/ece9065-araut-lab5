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
      }else if(list){
          list.list_items.push(req.body.items);
          
          list.save((err) => {
              if(err) {
                  throw err;
        
              }else {
                  res.json({success: true, msg: 'item added to the Wish List'});
              }
          });
      }
  });
}

exports.deleteWC = (req, res) => {
    let autho = req.headers.authorization;
   autho = autho.split(' ');
  let decoded = jwt.verify(autho[1], config.secret);
    Wish.remove({'list_name': req.body.list_name, 'byUser': decoded.email}, (err, list) => {
        if(err) {
            throw err;
        }
        if(!list){
            res.json({success: false, msg: "Error while deleting the Wish List"})
        }else {
            res.json({success: true, msg: 'List deleted successfully'});
        }
    });
}

exports.searchList = (req, res) =>{
    let autho = req.headers.authorization;
   autho = autho.split(' ');
  let decoded = jwt.verify(autho[1], config.secret);
  
  Wish.findOne({'list_name': req.body.list_name, 'byUser': decoded.email}, (err, item) => {
      if(err) {
          throw err;
      }
      if(!item) {
          res.json({success: false, msg: 'No List with this name found'})
      }else {
          res.json({success: true, msg: item});
      }
  });
}

exports.updateList = (req, res) => {
    if(req.body.isPrivate === 'true') {
        req.body.isPrivate = true
    }else if(req.body.isPrivate === 'false'){
        req.body.isPrivate = false
    }
    
    console.log(req.body);
    Wish.update({'id': req.body.id, 'byUser': req.body.byUser}, {$set: {'list_name': req.body.list_name, 'list_desc': req.body.list_desc, 'isPrivate': req.body.isPrivate}}, (err, result) => {
        if(err) {
            throw err;
        }
        if(!result) {
            res.json({success: false, msg: ' Error in List update'})
        }else {
            res.json({success: true, msg: 'List updated Successfully'});
        }
    });
}

exports.addtoCart = (req, res) => {
    let autho = req.headers.authorization;
   autho = autho.split(' ');
  let decoded = jwt.verify(autho[1], config.secret);
  
  Cart.findOne({'forUser': decoded.email}, (err, item) => {
      if(err) {
          throw err;
      }
      if(!item) {
          
          let item_list = {
              item_name: req.body.item_name,
              item_avail: parseInt(req.body.avail),
                  item_price: parseInt(req.body.price),
                  item_tax: parseInt(req.body.tax),
              buy: 1
          };
          
          
          let newCart = new Cart({
              forUser: decoded.email,
              item_list: item_list
          });
          
          newCart.save((err) => {
              if(err){
                  throw err;
              }else {
              Item.findOne({"item_name": req.body.item_name}, (err, result) => {
                  if(err) throw err;
                  
                  if(!result) {
                      console.log('No item of this name')
                  }else {
                      result.avail -= 1;
                      
                      result.save((err) => {
                          if(err) throw err;
                          res.json({success: true, msg: 'Added to Cart'});
                      })
                  }
              });
              }
          });
      }
      if(item) {
              let newItem = {
                  item_name: req.body.item_name,
                  item_avail: parseInt(req.body.avail),
                  item_price: parseInt(req.body.price),
                  item_tax: parseInt(req.body.tax),
                  buy: 1
              };
              
              item.item_list.push(newItem);
              
              item.save((err) => {
                  if(err) {
                      throw err;
                  }else {
                      res.json({success: true, msg: 'Added Successfully'});
                  }
              });
              
          }
  });
}

exports.getCart = (req, res) => {
     let autho = req.headers.authorization;
   autho = autho.split(' ');
  let decoded = jwt.verify(autho[1], config.secret);
  
  Cart.findOne({'forUser': decoded.email}, (err, item) => {
      if(err) {
          throw err;
      }
      if(!item) {
          res.json({success: false, msg: 'No items added to cart'})
      }else {
          res.json({success: true, msg: item.item_list})
      }
  })
}

exports.getAllWishes = (req, res) => {
    let autho = req.headers.authorization;
   autho = autho.split(' ');
  let decoded = jwt.verify(autho[1], config.secret);
  
  Wish.findOne({'byUser': decoded.email}, (err, item) => {
      if(err) {
          throw err;
      }
      if(!item) {
          res.json({success: false, msg: 'No Wish list for this user '});
      }else {
          res.json({success: true, msg: item.list_items});
      }
  });
}

exports.getPublic = (req, res) => {
    Wish.find({'isPrivate': false}, (err, items) => {
        if(err) {
            throw err;
        }
        if(!items) {
            res.json({success: false, msg: 'No Public wish lists available'});
        }else {
            res.json({success: true, msg: items});
        }
    });
}


exports.addComment = (req, res) => {
     let autho = req.headers.authorization;
  autho = autho.split(' ');
  let decoded = jwt.verify(autho[1], config.secret);
  
  Comment.findOne({'byUser': decoded.email, 'forItem': req.body.item}, (err, item) => {
      if(err) {
          throw err;
      }
      if(item) {
            item.comment = req.body.comment;
            item.rating = req.body.rating;
            
            item.save((err) => {
                if(err) {
                    throw err;
                }else {
                    res.json({success: true, msg: ' Comment updated successfully'});
                }
            })
      }else{
          let newComment = new Comment({
              forItem: req.body.item,
              byUser: decoded.email,
              comment: req.body.comment,
              rating: req.body.rating,
              isActive: true
          });
          
          newComment.save((err) => {
              if(err) {
                  throw err;
              }else {
                  res.json({success: true, msg: 'Comment added successfully'});
              }
          })
      }
  })
}


exports.showComments = (req, res) => {
  
  Comment.find({'forItem': req.body.item}).sort({rating: 'desc'}).exec((err, items) =>{
      if(err) {
          throw err;
      }
      if(!items) {
          res.json({success: false, msg: ' No Comments for this Item found'})
      }else {
          let arr = [];
         items.forEach((element) => {
             if(element.isActive == true) {
                arr.push(element) 
             }
         });
         
         res.json({success: true, msg: arr});
      }
  });
}

exports.searchUser = (req, res) => {
    User.findOne({'email': req.body.user}, (err, item) => {
        if(err) {
            throw err;
        }
        if(!item) {
            res.json({success: false, msg: 'No User with this Email'})
        }else {
            res.json({success: true, msg: item});
        }
    });
}

exports.changeUser = (req, res) => {
    if(req.body.isActive == 'false') {
        req.body.isActive = false;
    }else if(req.body.isActive == 'true'){
        req.body.isActive = true;
    }
    
 User.update({'email': req.body.email}, {$set: {isAdmin: req.body.isAdmin, isActive: req.body.isActive}}, (err, result) =>{
     if(err) {
         throw err;
     }
     if(!result) {
         res.json({success: false, msg: 'Error while saving user credentials'})
     }else {
         res.json({success: true, msg: 'Successfully changed user status'})
     }
 });
    
}

exports.commentSearch = (req, res) => {
    Comment.find({'byUser': req.body.email, 'forItem': req.body.item}, (err, item) => {
        if(err) {
            throw err;
        }
        if(!item){
            res.json({success: false, msg: 'No comments found for' + req.body.user + ' on '+ req.body.item+ ' item'})
        }else {
            res.json({success: true, msg: item});
        }
    });
}

exports.changeComment = (req, res) => {
    
    Comment.findOne({'id': req.body.id}, (err, item) =>{
        if(err) {
            throw err;
        }
        if(!item) {
            res.json({success: false, msg: 'No Comment to hide'})
        }else {
            item.isActive = req.body.isActive;
            
            item.save((err) => {
                if(err) throw err;
                res.json({success: true, msg: 'Comment status changed'});
            });
        }
    });
}