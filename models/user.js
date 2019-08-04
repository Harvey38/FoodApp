const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
var addressschema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        validate(val){
            var name = val.split(' ').join('');
           if(!validator.isAlpha(name)){
               throw new Error("The street name should be a string");
           }
        }
    },
    suite: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            if (!validator.isAlpha(val)) {
                throw new Error("The city name should be a string");
            }
        }
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
        trim:true,
        validate(val) {
            if (!validator.isAlpha(val)) {
                throw new Error("The name should be a string");
            }
        }
    },
    username:{
        type:String,
        trim:true,
        validate(val) {
            if (!validator.isAlpha(val)) {
                throw new Error("The user name should be a string");
            }
        }
    },
    email:{
        type:String,
        trim:true,
        unique:true,
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
        required:true,
        validate(val) {
            if (!validator.isAlpha(val)) {
                throw new Error("The plan name should be a string");
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:8
    },
    confirmpassword:{
        type:String,
        required:true,
        validate(val){
            if(val!=this.password){
                throw new Error("This must be same as the password");
            }
        }
    }
});
userschema.pre('save', async function (next) {
    var pass = await bcrypt.hash(this.password, 8);
    this.password = pass;
    this.confirmpassword = undefined;
    next();
});
const User = mongoose.model('user',userschema);
module.exports=User;
