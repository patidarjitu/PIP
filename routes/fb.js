var express = require('express');
var User = require('../models/users');
var router = express.Router();

router.post('/login',function(req,res){
   console.log(req);
   
   User.find({userid:req.body.params.id},function(err,user){
       if(err) {
        console.log(err);  // handle errors!
        console.log("1");
      }
      if (!err && user !== null&&user.length>0) {
          console.log(user);
        res.send(user);
      } else {
        user = new User({
          userid: req.body.params.id,
          profilepic: req.body.params.profilepic,
          username:req.body.params.username,
          location:req.body.params.location
        });
        console.log("3");
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            res.send(user);
          }
        });
      }
   });
//    var comment=new Comment();
//   
//    Comment.find({_id:req.body.params.id}, function(err, post) {
//        var p={comment:req.body.params.com,user:req.user._id,username:req.user.username};
//        console.log(p);
//         post[0].comments.push(p);
//       if (err) return res.send(err);
//       
//       post[0].save(function(err) {
//         if (err) return res.send(err);
//         User.findOneAndUpdate({_id:req.user._id},{ $inc: { points: 5, comments:1 }})
//        .exec(function(err,user){
//            if(err){
//                console.log(err);
//            }
//            
//        })
//         res.json({ status : 'done' });
//       });
//     });
   
});

module.exports = router;
