var User = require("./../models/user");
const assert = require("assert");
const getuser = function(req, res) {
    var queryobj = { ...req.query };
  let Excludequery=["fields","page","sort","limit"];
  for(var i=0;i<Excludequery.length;i++){ 
  delete queryobj[Excludequery[i]];}
  if(req.query.sort===undefined){
  User.find({queryobj})
    .then(docs => {
      res.send(docs);
    })
    .catch(err => {
      res.status(403).send(err);
    });}
    else{
      User.find({}).sort(req.query.sort)
          .then(docs => {
              res.send(docs);
          })
          .catch(err => {
              res.status(403).send(err);
          });
    }
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
  User.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err, doc) => {
    assert.equal(err, null);
    res.send(doc);
  });
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

module.exports = { getuser, getspecificuser, postuser, patchuser, deleteuser };
