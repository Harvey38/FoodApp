const express = require('express');
var user = require('../data/user.json');
const fs = require('fs');
var { getuser, getspecificuser, postuser, patchuser, deleteuser,checkusrbody,checkid } = require('./../controller/userController.js');
var {signup} = require('./../controller/authcontroller');
let userRouter = express.Router();
userRouter.route('/')
    .get(getuser)
    .post(postuser);
userRouter.route('/signup').post(signup);
userRouter.route('/:id')
    .get(getspecificuser)
    .patch(patchuser)
    .delete(deleteuser);
module.exports = userRouter;