const http = require('http') ;

const cors = require('cors');

var mongoose = require('mongoose');

require('dotenv').config();

bodyParser = require('body-parser');

// import express
const express = require('express') ;

const app = express();
const fs = require("fs");

const fileUpload = require('express-fileupload');

const session = require('express-session');
// this is middleware
app.use(cors());

// used to parse json
// app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.urlencoded({extended: true})  );
app.use(bodyParser.json()) ;


app.use(session({secret: 'SECRET', saveUninitialized: false,
resave: false}));


// mongodb connection 

try{

const uri = "mongodb+srv://admin:1234@cluster0-14764.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true }
  );
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
  });

}catch (err) {
    console.error(err.message);
}

//use the files
//const materialRouter = require('./routes/material');
//const usersRouter = require('./routes/user');

app.use(session({secret: "SECRET",
saveUninitialized: false,
resave: false}));


// use fileupload with using multer
app.use(fileUpload({
  createParentPath: true
}));

const uploadFile = require('./routes/upload');   /// be hold

const registeration = require('./routes/user') ;
const blog = require('./routes/blog');



//public folder  
app.use(express.static(__dirname + '/public/uploads'));



// for session
function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};





 app.use('/uploads', uploadFile);       /// be hold



app.use(registeration);

app.use(blog);

// app.use('/login',login);
// app.use('/logout',logout);







//for errors , it will return the status
// app.use(function (err, req, res) {
//   console.error("you have error is "+err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   //res.status(err.statusCode).send(err.message);
//   console.error("status error code is "+err.statusCode +" "+ err.messag );
 
// });








const server = http.createServer(app);

server.listen(8888);