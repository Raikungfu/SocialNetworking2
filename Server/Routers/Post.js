const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');
const Cookies = require('cookies')

const AccountModel = require("../Modules/account");

app.use(function (req, res, next) {
  next();
});

app.post('/news', function (req, res, next) {
    
});

app.get('/', function (req, res, next) {
    
});

app.delete('/:id', function (req, res, next) {
});


module.exports = app;