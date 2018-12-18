module.exports = function(app, passport) {
    
    var api = require("../controller/api");
   
    app.post('/register', api.register);
    
    app.post('/login', api.login);
    
    app.post('/admin_login', api.adminLogin);
    
    app.post('/add_item', passport.authenticate('jwt', {session: false}), api.addItem)
    
    app.post('/search_game', passport.authenticate('jwt', {session: false}), api.search_game);
    
    app.post('/update_item', passport.authenticate('jwt', {session: false}), api.updateItem);
    
    app.post('/delete_item', passport.authenticate('jwt', {session: false}), api.deleteItem);
    
    app.get('/getAll', api.getAll);
}