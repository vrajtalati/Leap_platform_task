const mongoose=require('mongoose')

const ReviewSchema=mongoose.Schema({
    mentor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Mentor",
    },
    reviewText: {
        type: String,
        required: true
    },
});

module.exports =mongoose.model('Review',ReviewSchema);