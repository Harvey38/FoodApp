const express = require('express');
const { getplan, getspecificplan, patchplan, postplan, deleteplan,checkplbody,checkid } = require('../controller/planController.js');
const fs = require('fs');
var plans = require('../data/plan.json');
let planRouter = express.Router();
planRouter.route('/')
    .get(getplan)
    .post(postplan);
planRouter.route('/:id')
    .get(getspecificplan)
    .patch(patchplan)
    .delete(deleteplan);
module.exports = planRouter;
