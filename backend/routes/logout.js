
const router = require('express').Router();
var express = require("express");
//const router = express.Router();
var mongoose = require('mongoose');
const session = require('express-session');


router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});


module.exports = router;