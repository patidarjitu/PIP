var express = require('express');
var passport = require('passport');
var Post = require('../models/posts');
var Comment = require('../models/comments');
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
   console.log(req);
   var comment=new Comment({});
   comment.save(function(err,comment){
       if(err){
           console.log(err);
       }
       console.log(comment);
       var post=new Post({
            title:req.body.Title,
            description:req.body.Description,
            user:req.user._id,
            location:req.body.coords,
            comment:comment._id
        });
       post.save(function(err,docs){
       if(err){
           console.log(err);
       }
       res.send(docs);
   });
   });
   
});

router.post('/comment',function(req,res){
   console.log(req.body.params.id);
   var comment=new Comment();
  

    
   Comment.find({_id:req.body.params.id}, function(err, post) {
       var p={comment:req.body.params.com,user:req.user._id};
       console.log(post);
        post[0].comments.push(p);
      if (err) return res.send(err);
      
      post[0].save(function(err) {
        if (err) return res.send(err);
        res.json({ status : 'done' });
      });
    });
   
});

module.exports = router;