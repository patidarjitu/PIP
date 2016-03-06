var mongoose=require('mongoose');

var CommentSchema=mongoose.Schema({
    
    comments:[
        {
            comment:
            {
                type:String,
                required:true
            },
            user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username:
            {
                type:String,
                required:true
            },
    }]
});
module.exports= mongoose.model('Comment', CommentSchema);