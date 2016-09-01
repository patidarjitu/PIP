var mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    profile:{
        username:{
            type:String,
            required:true,
            lowercase:true
        },
        profilepic:{
            type:String,
            required:true,
            match:/^https:\/\//i
        },
        points:{
            type:Number,
            default:0
        }
    },
    data:{
        oauth:{
            type:String
        }
    }    
});