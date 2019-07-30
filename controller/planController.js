var Plan = require("../models/plan");
const deleteplan = function(req, res) {
  Plan.deleteOne({_id:req.params.id}).then((doc)=>{
    //if we had used findbyiddelete it would have returnedthe doc which has been deleted.
    res.send(doc);
  }).catch((err)=>{
    res.status(403).send(err);
  });

};
const patchplan = function(req, res) {
  Plan.findByIdAndUpdate({_id:req.params.id},req.body,{new:true}).then((doc)=>{
    console.log(doc);
    res.send(doc);
  }) .catch((err)=>{
    res.status(403).send(err);
  });
};
const postplan = function(req, res) {
  var newplan = Plan(req.body);
  newplan.save().then((doc)=>{
    res.send(doc);
  }).catch((err)=>{
    res.status(403).send(err);
  });
};

const getplan = async function(req, res) {
  try{
  var queryobj={...req.query};
  let Excludequery=["fields","page","sort","limit"];
  for(var i=0;i<Excludequery.length;i++){ 
  delete queryobj[Excludequery[i]];}
  //this is for finding according to the values eneterd by the user in the url ie the filter
  let result=Plan.find(queryobj);
    result = await result.sort(req.query.sort);
  res.status(200).json({
    result:result
  })
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
}
catch(err){
  res.status(400).json({
    response:"Data not found",
    err:err
  })

}
};
const getspecificplan = function(req, res) {
  Plan.findById(req.params.id).then((doc) => {
    if(doc===undefined){
      throw new Error('Data not found');
    }
    res.send(doc);
  }).catch((err) => {
    res.status(403).send(err);
  });
};
module.exports = {
  getplan,
  getspecificplan,
  patchplan,
  deleteplan,
  postplan
};
