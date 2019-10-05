const express = require('express');
var user = require('../data/user.json');
const fs = require('fs');
var { getuser, getspecificuser, postuser, patchuser, deleteuser,checkusrbody,checkid,resetpass } = require('./../controller/userController.js');
var {signup,login,protectroute,putupdateid,authorize,authorise,forgetPassword,resetPassword,logout} = require('./../controller/authcontroller');
let userRouter = express.Router();
userRouter.route('/')
    .get(protectroute,getuser);
    // .post(postuser);
userRouter.route('/signup').post(signup);
userRouter.route('/login').post(login);
userRouter.route('/logout').get(logout);
userRouter.route('/forgetPassword').post(forgetPassword);
userRouter.route('/resetPassword/:token').patch(resetPassword);
userRouter.route('/patchdata').post(putupdateid,patchuser);
userRouter.route('/reset').patch(putupdateid,resetpass);
userRouter.route('/:id')
    .get(getspecificuser)
    .patch(protectroute,authorise("admin","RestaurantOwner","user"),patchuser)
    .delete(authorize,deleteuser);
module.exports = userRouter;