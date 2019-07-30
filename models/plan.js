const mongoose = require('mongoose');
const validator = require('validator');
const Plan = mongoose.model('Plan', {
    ratingsAverage:{
        type:Number,
    },
    totalRating:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        trim:true,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    duration:{
        type:Number
    },
    price:{
        type:Number,
        required:true
    },
    description: {
        type: String,
        required:true
    },
});
module.exports=Plan;