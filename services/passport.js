// Authentication layer to protect routes
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy (sign in)
const localOptions = {usernameField: "email"};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  //verify email and password, call done with user
  User.findOne({email: email}, function(err, user) {
    if (err) { return done(err, false); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err, false); }
      if (!isMatch) { return done(null, false); }

      return  done(null, user);
    });

  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if the user id in the payload exists in our db, if so call done with that user
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
