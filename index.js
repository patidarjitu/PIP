var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    
    path = require('path');

    
    
    // mongodb://localhost:27017/public
    mongoose.connect('mongodb://prithvi:prithvi@ds019078.mlab.com:19078/prithvi');
var User = require('./models/users.js');

var app = express();


var posts = require('./routes/post.js');

  var fb = require('./routes/fb.js');
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



app.use('/api/', posts);


app.use('/fb/', fb);



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
