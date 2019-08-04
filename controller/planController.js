var Plan = require("../models/plan");
const deleteplan = function(req, res) {
  Plan.deleteOne({ _id: req.params.id })
    .then(doc => {
      //if we had used findbyiddelete it would have returnedthe doc which has been deleted.
      res.send(doc);
    })
    .catch(err => {
      res.status(403).send(err);
    });
};
const patchplan = function(req, res) {
  Plan.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(doc => {
      // console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      res.status(403).send(err);
    });
};
const postplan = function(req, res) {
  Plan
    .create(req.body)
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      res.status(403).send(err);
    });
};

const getplan = async function(req, res) {
  try {
    var queryobj = { ...req.query };
    let Excludequery = ["fields", "page", "sort", "limit","filter"];
    for (var i = 0; i < Excludequery.length; i++) {
      delete queryobj[Excludequery[i]];
    }
    //this is for finding according to the values eneterd by the user in the url ie the filter
    let result = Plan.find(queryobj);
    var obj = {};
    if(req.query.sort!=undefined){
    var arr = req.query.sort.split(",");
    var str = arr.join(" ");
    // for (var i = 0; i < arr.length; i++) {
    //   obj[arr[i]] = 1;
    // }
    result = result.sort(str);
    }
    if (req.query.filter) {
      var param = req.query.filter.split(",").join(" ")
      result.select(param);
    } else {
      result.select("-__v");
    }
    var page =req.query.page||1;
    var limiting=req.query.limit||3;
    result.skip(+((page-1)*limiting)).limit(+(limiting))
    result = await result;

    res.status(200).json({
      result: result
    });
    // if(req.query.sort!=undefined){
    // Plan.find({}).sort(queryobj.sort).then((docs)=>{
    //   res.send(docs);
    // }).catch((err)=>{
    //   res.status(403).send(err);
    // });}
    // else{
    //   Plan.find(queryobj).then((docs) => {
    //     res.send(docs);
    //   }).catch((err) => {
    //     res.status(403).send(err);
    //   });
    // }
  } catch (err) {
    res.status(400).json({
      response: "Data not found",
      err: err
    });
  }
};
const getspecificplan = function(req, res) {
  Plan.findById(req.params.id)
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
const checkurl = function(req,res,next){
  var url = req.url;
  if(url==='/top5plans'){
    req.query["page"]=1;
    req.query["limit"]=5;
    req.query["sort"]="price,ratingsAverage";
    req.query["filter"]="name,duration,description";
  }
  next();
};
module.exports = {
  getplan,
  getspecificplan,
  patchplan,
  deleteplan,
  postplan,
checkurl};
