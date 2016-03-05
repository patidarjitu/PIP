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

   user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   location: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2dsphere'      // create the geospatial index
    }
//    comments:''
     
});

module.exports= mongoose.model('Post', PostSchema);   