var User = require("./../models/user");
const assert = require("assert");
const bcrypt = require("bcrypt");
const getuser = function(req, res) {
  //   var queryobj = { ...req.query };
  // let Excludequery=["fields","page","sort","limit"];
  // for(var i=0;i<Excludequery.length;i++){
  // delete queryobj[Excludequery[i]];}
  // if(req.query.sort===undefined){
  // User.find({queryobj})
  //   .then(docs => {
  //     res.send(docs);
  //   })
  //   .catch(err => {
  //     res.status(403).send(err);
  //   });}
  //   else{
  //     User.find({}).sort(req.query.sort)
  //         .then(docs => {
  //             res.send(docs);
  //         })
  //         .catch(err => {
  //             res.status(403).send(err);
  //         });
  //   }

  User.find({})
    .then(doc => {
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(403).send(err);
    });
};
const getspecificuser = function(req, res) {
  User.findById(req.params.id)
    .then(doc => {
      if (doc === undefined) {
        throw new Error("Data not found");
      }
      res.send(doc);
    })
    .catch(err => {
      res.status(403).send(err);
    });
};
const postuser = function(req, res) {
  var newuser = User(req.body);
  newuser
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.status(403).send(err);
    });
};
const patchuser = function(req, res) {
  const id = req.params.id || req.headers.user._id;
  User.findByIdAndUpdate(id, req.body, { new: true }, (err, doc) => {
    console.log(doc);
    assert.equal(err, null);
    res.json({
      status: "user updated"
    });
  });
};
const resetpass = function(req, res) {
  try{
  const currentpassword = req.body.currentpassword;
  const newpassword = req.body.newpassword;
  const confirmpassword = req.body.confirmpassword;
  const dbpass = req.headers.user.password;
  const user = req.headers.user;
  var value = bcrypt.compare(currentpassword,dbpass);
  if(value)
  {
    user.password = newpassword;
    user.confirmpassword=confirmpassword;
    user.save();
    res.json({
      status:"password updated"
    })
  }
  else{
    res.json({
      status:"error"
    })
  }
}
catch(err)
{
  console.log(err);
}
};

const deleteuser = function(req, res) {
  User.findByIdAndDelete(req.params.id)
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.status(403).send(err);
    });
};

module.exports = {
  getuser,
  getspecificuser,
  postuser,
  patchuser,
  deleteuser,
  resetpass
};
