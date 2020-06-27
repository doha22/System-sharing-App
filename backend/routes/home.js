const router = require('express').Router();
var express = require("express");
//const router = express.Router();
var mongoose = require('mongoose');
const session = require('express-session');


let material = require('../models/upload');
// list of materials and categories .


// check first if user is authenticated 


router.route('/').get((req, res) => {
    material.find()
  
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

router.route('/home').get((req,res) => {
    if(req.session.email) {
       return res.write(`<h1>Hello ${req.session.email} </h1><br>`);
       // res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
       return res.end('<a href='+'/'+'>Login</a>');
    }
});