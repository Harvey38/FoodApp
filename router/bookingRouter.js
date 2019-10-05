var { protectroute } = require("./../controller/authcontroller");
let { getCheckout } = require("./../controller/bookingController");
const express = require("express");
let bookingRouter = express.Router();

bookingRouter.route("/:planId").get(protectroute, getCheckout);

module.exports = bookingRouter;
