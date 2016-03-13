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
        location: {
            type: [Number], // [<longitude>, <latitude>]
            index: '2dsphere'      // create the geospatial index
            },
        gender:{
            type:String
        },
        points:{
            type:Number,
            default:5
        },
        posts:{
            type:Number,
            default:0
        },
        
        comments:{
            type:Number,
            default:0
        },
        userid:{
            type:Number,
            required:true
        },
        profilepic:{
            type:String 
        }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);    