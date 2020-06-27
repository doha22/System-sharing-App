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

// newuser.save((err, result) => {
//         if (!err){
//             res.send(result);
//             res.status(200).send(['registered successfully']) ;
//              // redirect to login page
//          } else {
//             if (err.code == 11000)
//                 res.status(422).send(['Duplicate email adrress found.']);
//             else
//                 return next(err);
//              //   res.status(500).send(['something went wrong'])
               
//         }
//     });

// user.create(newuser, function(err, result) {
//   if(err) return res.status("error");
//   req.session.user = email;
//   return res.send('Logged In!');

// });
newuser.save(function(err,saveduser){
if(err){
  console.log(err);
  return res.status(500).send();
}
// else  if (err.code == 11000){
 
//     res.status(422).send(['Duplicate email adrress found.']);
// }
   res.status(200).send("successfully signup");
   sess = req.session;
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


//  newmaterial.save()
//  .then(users => res.json('material added successfuly'))
//  .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/logout').get( function (req, res) {
//     //req.session.user = null;
//     req.logout();
//   res.send(401);
//    // res.status(200).send(['User Successfully logged out']);
//  });
router.route('/logout').get((req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});




module.exports = router;