const router = require('express').Router();
var express = require("express");
//const router = express.Router();
var mongoose = require('mongoose');
let user = require('../models/user');
const session = require('express-session');


router.route('/login').post( (req, res)=> {

    const email = req.body.email;
    const password = req.body.password;
 
    //   user.findOne({Email: email, Pass: password}, function(err, user) {
    //    if(err) return next(err);
    //    if(!user) return res.send('Not logged in!');
 
    //    //req.session.user = email;
    //    return res.send('Logged In!');
    // });
    

    // if(email == loggedUser.email && password == loggedUser.password){
    //     res.status(200).send(['User Successfully logged in ']);
    // }
    // else{
    //     res.status(200).send(['email or password were wrong  ']);
    // }
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

 

  return res.status(200).send("User Successfully logged in ")

  })

 });





















module.exports = router;