const router = require('express').Router();
var express = require("express");
//const router = express.Router();
var mongoose = require('mongoose');
let user = require('../models/user');
const session = require('express-session');


router.route('/login').post( (req, res)=> {

    const email = req.body.email;
    const password = req.body.password;
 
 
  user.findOne({email : email , password : password}, function(err,user) {

    if(err){
        console.log(err);
        return res.status(500).send;
    }
  if(!user){
    return res.status(404).send("wrong data");
  }
//  start session for logged in user
//var UserName ='';
sess = req.session;
sess.email = req.body.email;  // set session for email

 

  return res.status(200).json({
    message: " User successfully login!",
    users: user
});

  })

 });





















module.exports = router;