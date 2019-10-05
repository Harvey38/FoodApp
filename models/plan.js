const mongoose = require('mongoose');
const validator = require('validator');
let planschema=new mongoose.Schema({
    ratingsAverage:{
        type:Number,
        validate(val){
            if(val>this.totalRating){
                throw new Error("Average rating cannot be greater than total rating")
            }
        }
    },
    desc:{
        d1: {
            type: String
        },
        d2: {
            type: String
        },
        d3: {
            type: String
        },
        d4: {
            type: String
        }
    },
    totalRating:{
        type:Number,
        required:true
    },
    name: {
        type: String,
        required:true,
        validate(val) {
            if (!validator.isAlpha(val)) {
                throw new Error("The name must be a string")
            }
        }
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
        required:true,
    },
    cpm:{
        type:Number
    }
});
const Plan = mongoose.model('Plan',planschema);
module.exports=Plan;