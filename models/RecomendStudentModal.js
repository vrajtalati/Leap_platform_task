const mongoose = require('mongoose');

const recommendStudentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    recommendationLetter: {
        type: String,
        default:"This is the certificate of Student",
        required: true
    },

});

module.exports = mongoose.model('RecommendStudent', recommendStudentSchema);