var express = require('express');
var passport = require('passport');
var Post = require('../models/posts');
var Comment = require('../models/comments');
var User = require('../models/users');
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
router.get('/users',function(req,res){
   User.find().
   sort({points: -1}).
   exec(function(err,docs){
       if(err){
           console.log(err);
       }
           console.log(docs);
       res.send(docs);
   });
});


router.get('/getcomments',function(req,res){
    console.log(req.query.id);

   Comment.find({_id:req.query.id}).
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

router.get('/unear',function(req,res){
   User.find({ location :
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
            user:req.body.User,
            location:req.body.coords,
            comment:comment._id
        });
       post.save(function(err,docs){
       if(err){
           console.log(err);
       }
       User.findOneAndUpdate({_id:req.body.User},{ $inc: { points: 5, posts:1 }})
       .exec(function(err,user){
           if(err){
               console.log(err);
           }
           
       })
       res.send(docs);
   });
   });
   
});

router.post('/comment',function(req,res){
   console.log(req.body.params.id);

  
   Comment.find({_id:req.body.params.id}, function(err, post) {
       var p={comment:req.body.params.com,user:req.body.params.user,username:req.body.params.username,profilepic:req.body.params.profilepic};
       console.log(p);
        post[0].comments.push(p);
      if (err) return res.send(err);
      
      post[0].save(function(err) {
        if (err) return res.send(err);
        User.findOneAndUpdate({_id:req.body.params.user},{ $inc: { points: 5, comments:1 }})
       .exec(function(err,user){
           if(err){
               console.log(err);
           }
           
       })
        res.json({ status : 'done' });
      });
    });
   
});

router.post('/like',function(req,res){
   console.log(req.body.params.user);

  
   Post.findOneAndUpdate({_id:req.body.params.id},{$push: {"likes": {user:req.body.params.user}}},
    {safe: true, upsert: true}, function(err, post) {
       
       console.log(post);
        
      if (err) return res.send(err);
      
      
        res.send(post);
      
    });
   
});

router.post('/editpost',function(req,res){
   

  
   Post.findOneAndUpdate({_id:req.body.params._id},  {description:req.body.params.description},
    {safe: true, upsert: true}, function(err, post) {
       
       console.log(post);
        
      if (err) return res.send(err);
      
      
        res.send(post);
      
    });
   
});

module.exports = router;