var mongoose=require('mongoose');
//var user=require('./users');
//var comments=require('./comments');

var PostSchema= mongoose.Schema({
   title:{
       type:String,
       required:true, 
       index: true
   },
   description:{
       type:String,
       required:true
   },
   createddate:{
       type:Date,
        default: Date.now,
       required:true,
   },
   modifieddate:{   
       type:Date,
        default: Date.now,
       required:true,
    },
    likes: [{user:{type: mongoose.Schema.Types.ObjectId, ref:'User'}}],
   user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   location: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2dsphere'      // create the geospatial index
    },
    comment:{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
     
});

module.exports= mongoose.model('Post', PostSchema);   