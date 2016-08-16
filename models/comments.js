var mongoose=require('mongoose');
var user=require('/user');

module.exports=new mongoose.Schema({
    comments:[
        {
            user:user,
            commentdescription:{
                type:String
            }
        }
    ]
});