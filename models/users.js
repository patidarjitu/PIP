var mongoose=require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var userSchema = mongoose.Schema({
        password:{
            type:String
        },
        username:{
            type:String,
            required:true
        },
        gender:{
            type:String
        },
        points:{
            type:Number,
            default:0
        },
    
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);    