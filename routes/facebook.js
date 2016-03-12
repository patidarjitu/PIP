var express = require('express');
var passport = require('passport');
var Account = require('../models/users');
var router = express.Router();
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');

// global config// config


passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL,
  profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    
    process.nextTick(function () {
        console.log(profile);
      return done(null, profile);
    });
  }
));


router.get('/facebook',
  passport.authenticate('facebook'),
  function(req, res){
  });
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/ping' }),
  function(req, res) {
     
      console.log(req);
      console.log(res);
    res.send(req.user);
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
    });
module.exports = router;