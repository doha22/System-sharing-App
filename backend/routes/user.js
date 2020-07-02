const router = require('express').Router();
var express = require("express");
//const router = express.Router();
var mongoose = require('mongoose');
let user = require('../models/user');
const session = require('express-session');

// middle ware for user session
// function isLoggedIn (req, res, next) {
//     if (!(req.session && req.session.user)) {
//       return res.send('session , Not logged in!');
//     }
//     next();
//   }
  
  
//     router.route('/api').get(isLoggedIn, function (req, res) {
//     //Something private
//     res.send("session started");
//   })
  

// start session
//Here ‘secret‘ is used for cookie handling
router.use(session({secret: "SECRET",
saveUninitialized: false,
resave: false}));
var sess;

router.route('/register').post((req, res) => {
//module.exports.register = (req, res, next) => {
   
    const fullName = req.body.fullName;
    const email = req.body.email ;
    const password = req.body.password ;

    const newuser = new user({
        fullName,
        email,
        password,
    
       })


newuser.save(function(err,saveduser){
if(err){
  console.log(err);
  return res.status(500).send();
}
// else  if (err.code == 11000){
 
//     res.status(422).send(['Duplicate email adrress found.']);
// }
   res.status(200).json({ 
    message: "User Successfully Signup ",
    users: saveduser
});
   sess = req.session;
   ses = req.body.fullName ;  // set session for username
   sess.email = req.body.email;  // set session for email
   return res.redirect("/login");

}

)

});

// error handler
router.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});





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
    message: "User Successfully logged in ",
    users: user
});
  })

 });




router.route('/logout').get((req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});




module.exports = router;