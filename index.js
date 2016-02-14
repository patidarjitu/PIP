var express=require('express');
var app=express();
var port=process.env.PORT||8080;
var db=require('mongoose');
var userSchema=require('./models/users');


app.listen(port);               
console.log('App Started on port ' + port);


db.model('User', userSchema);
var User = db.model('User');
var user=new User();

db.connect('mongodb://localhost:27017/pwork',function(err,res){
if(err){
    console.log(err);
}

app.get('/',function(req,res){
   User.find({},function(err,docs){
      if(err){
          console.log(err);
          throw err;
      }else{
          res.send(docs);
      } 
   });
});
app.post('/user',function(req,res){
    user.profile.username=req.query.username;
    user.profile.profilepic=req.query.profilepic;
    console.log(user.username);
    user.save(function(err,res){
        if(err){
        console.log(err);
        throw err;
        }
        else{
            console.log('saved');
        }
    })
    
});

});;