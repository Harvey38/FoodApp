const plan=require("./../models/plan");
module.exports.viewHomePage = async (req, res) => {
  const plans = await plan.find().limit(3);
  res.status(201).render("home.pug", {
    title: "Home page",
    plans:plans
  });
};
module.exports.viewLoginPage = (req, res) => {
  res.status(201).render("login.pug", {
    title: "login page"
  });
};
module.exports.viewprofile = (req, res) => {
  res.status(201).render("profile.pug", {
    title: "login page"
  });
};
module.exports.updatepage=(req,res)=> {
  res.status(201).render("updateprofile.pug",{
    
  });
};
module.exports.resetpassword=(req,res)=>{
res.status(201).render("resetpassword.pug",{});
};
module.exports.viewplansPage = async (req, res) => {
  // 1 Get Plan data from collection
  const plans=await  plan.find();
  console.log(plans.length);
  // 2 Build Template
  // 3 Render that template
  res.status(201).render("plans2.pug", {
    title: "plan page",
    plans:plans
  });
};
