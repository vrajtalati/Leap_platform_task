const mongoose =require('mongoose');

const MentorSchema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
    }
});

module.exports=mongoose.model('Mentor',MentorSchema);