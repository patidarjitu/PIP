var express = require('express');
var passport = require('passport');
var Post = require('../models/posts');
var Users = require('../models/users');
var router = express.Router();


router.get('/allposts',function(req,res){
   Post.find({},function(err,docs){
       if(err){
           console.log(err);
       }
       res.send(docs);
   });
});

router.get('/getpost',function(req,res){
   Post.findOne({_id:req.query.id}).
   populate('user').
   exec(function(err,docs){
       if(err){
           console.log(err);
       }
           console.log(docs);
       res.send(docs);
   });
});


router.get('/near',function(req,res){
   Post.find({ location :
                         { $near :
                           { $geometry :
                              { type : "Point" ,
                                coordinates : [req.query.lon,req.query.lat] } ,
                             $maxDistance : req.query.distance
                      } } }
    //                   {
    //    location: {
    //     $near: req.query.coords,
    //     $maxDistance: req.query.distance||50
    // }}
    ,function(err,docs){
       if(err){
           console.log(err);
       }
       res.send(docs);
   });
});


router.post('/createpost',function(req,res){
   var post=new Post({
       title:req.body.Title,
       description:req.body.Description,
       user:req.body.User,
       location:req.body        .coords
   });
   post.save(function(err,docs){
       if(err){
           console.log(err);
       }
       res.send(docs);
   });
});

module.exports = router;