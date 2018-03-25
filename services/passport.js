const passport = require('passport');
const passportJWT = require("passport-jwt");

const Users = require("../models/User/User.model");
const keys = require('../config/keys');

// jwt config
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: keys.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

// serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// JWT authentication
passport.use(new Strategy(params, function (payload, done) {
   Users.findById(payload)
    .then( user => {
        if(user) {
            // you can redirect to user logged-in  page here
           return done(null, user);
        }
        return res.redirect('/auth');
    })
    .catch(err => done(new Error("User not found"), null))
})
);
