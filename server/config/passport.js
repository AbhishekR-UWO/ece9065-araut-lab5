var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var User = require('../models/user');
var secretConfig = require('./dbConfig');

module.exports = function(passport) {
    
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secretConfig.secret;
    
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        
        User.findOne({id: jwt_payload.id}, (err, user) => {
            if(err) {
                return done(err, false)
            }
            if(user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))
}