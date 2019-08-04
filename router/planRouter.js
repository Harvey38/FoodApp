const express = require('express');
const { getplan, getspecificplan, patchplan, postplan, deleteplan,checkplbody,checkid,checkurl } = require('../controller/planController.js');
const fs = require('fs');
var plans = require('../data/plan.json');
let planRouter = express.Router();
planRouter.route(['/','/top5plans'])
    .get(checkurl,getplan)
    .post(postplan);
planRouter.route('/:id')
    .get(getspecificplan)
    .patch(patchplan)
    .delete(deleteplan);
module.exports = planRouter;
