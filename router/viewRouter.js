const express=require("express");
const {viewHomePage,viewLoginPage,viewplansPage,viewprofile,updatepage,resetpassword}=require("../controller/viewController");
const {isLoggedin} =require("./../controller/authcontroller");
const viewRouter=express.Router();
viewRouter.use(isLoggedin);
viewRouter.get("/home",viewHomePage);

viewRouter.get("/login",viewLoginPage);
viewRouter.get("/plans",viewplansPage);
viewRouter.get("/me",viewprofile);
viewRouter.get('/updateprofile',updatepage);
viewRouter.get('/resetpassword',resetpassword);
module.exports=viewRouter;