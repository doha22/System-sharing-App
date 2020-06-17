const router = require('express').Router();
let User = require('../models/user_info');

const bcrypt = require('bcrypt');

// using find() method is from mangoos and return data in json
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});



// register user

router.route('/register').post((req, res) => {

// creating user
const first_name = req.body.first_name;
const last_name = req.body.last_name ;
const user_name = req.body.user_name;
const password = req.body.password ;
 

 //use instance of user
 const newUser = new User(

   { first_name ,
    last_name ,
    user_name,
    password
  })

// save the user to db
    newUser.save()
      .then(reg => res.json('User added successfuly'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


// login user

router.route('/login').post((req, res) => {
  
  //  const user_name = req.body.user_name;
   
    // check by username

       User.findOne({user_name: req.body.user_name})
          .then(user => res.json('User added successfuly'))
          .catch(err => res.status(400).json('Error: ' + err));

          if (!user) res.sendStatus(204);
          else {
            bcrypt.compare(req.body.password, user.password)
                .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
        }
      });
    

      

      //  Username validation

      router.route('/validateUsername').post((req, res) => {

        User.findOne({user_name: req.body.user_name})
        .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
        .catch(err => res.status(400).json('Error: ' + err));
        
    
          });





module.exports = router;