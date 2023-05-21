const express = require("express");
const app = express();

var user = require("./user_route");
var shopCategories= require("./shop_categories")
var contact_us = require("./contact_us")


app.use("/user", user);
app.use("/shop",shopCategories)
app.use("/contactUs",contact_us)
module.exports = app;