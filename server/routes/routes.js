module.exports = function(app, passport) {
    
    var api = require("../controller/api");
   
    app.post('/register', api.register);
    
    app.post('/login', api.login);
    
    
}