const mongoose = require('mongoose');
const validator = require('validator');

var addressschema = new mongoose.Schema({
    street: {
        type: String,
        trim: true,
        required: true
    },
    suite: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    zipcode: {
        type: Number,
        required: true
    }
});
var userschema = new mongoose.Schema( {
    name:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Please enter a valid email");
            }
        }
    },
    address:[addressschema],
    phone:{
        type:Number
    },
    plan:{
        type:String,
        trim:true,
        required:true
    }
});
const User = mongoose.model('user',userschema);
module.exports=User;
