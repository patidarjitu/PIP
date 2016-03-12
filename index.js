var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    cors = require('cors'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy;

    
    
    // mongodb://localhost:27017/public
    mongoose.connect('mongodb://prithvi:prithvi@ds019078.mlab.com:19078/prithvi');
var User = require('./models/users.js');

var app = express();
app.use(cors());
var routes = require('./routes/api.js');
var posts = require('./routes/post.js');
 var fb = require('./routes/facebook.js');
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/user/', routes);

app.use('/api/', posts);

app.use('/auth/', fb)



app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;
