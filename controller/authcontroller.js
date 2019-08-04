const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signup =function(req,res){
    if(req.body.email!=undefined && req.body.password!=undefined){
        // var token=createtoken(req.body.email,req.body.username);
        var user = User(req.body).save().then((doc)=>{
            res.json({
                "document":doc
            });
        }).catch((err)=>{
            res.status(403).json({
                "error":err
            })
        })
    }
    else{
        res.status.send(403).json({
            err:"Email or password cannot be empty"
        })
    }
};
const login = async function(req,res){
    User.findOne({email:req.body.email}).then((doc)=>{
        if(doc===undefined){
            res.status(403).json({
                err:"Enter valid email "
            });}else{
            var pass = doc.password;
            var value=bcrypt.compare(req.body.password,pass);
            if(value){
            var email=doc.email;
            var username=doc.username;
            var token =createtoken(email,username);
            res.json({
                message:"User logged in",
                token:token
            });}
            else{
                res.status(403).json({
                    err: "Password incorrect"
                });
            }
        }
    })

};
function createtoken(email,username){
    var token = jwt.sign({ "email":email,"username":username },"shebangfkboi");
    return token;
}
module.exports ={signup,login};