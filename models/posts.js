var mongoose=require('mongoose');
var user=require('./users');
var comments=require('./comments');

module.exports=new mongoose.Schema({
   title:{
       type:String,
       required:true
   },
   description:{
       type:String,
       required:true
   },
   createddate:{
       type:Date,
       required:true,
   },
   modifieddate:{
       type:Date,
       required:true,
   },
   user:user,
   comments:comments
     
});