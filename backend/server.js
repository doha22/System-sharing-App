const http = require('http') ;

const cors = require('cors');

var mongoose = require('mongoose');

require('dotenv').config();

bodyParser = require('body-parser');

// import express
const express = require('express') ;

const app = express();

const session = require('express-session');
// this is middleware
app.use(cors());

// used to parse json
// app.use(express.json());

// app.use(bodyParser.urlencoded({
//   extended: false
// }));

app.use(bodyParser.urlencoded({extended: true})  );
app.use(bodyParser.json()) ;


app.use(session({secret: 'SECRET', saveUninitialized: false,
resave: false}));

// for errors
// process.on('unhandledRejection', function (err) {
//   throw err;
// });
// process.on('uncaughtException', function (err) {
//   console.error(err.stack); process.exit(1);
// });


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

const uploadFile = require('./routes/upload');

const registeration = require('./routes/user') ;

//const list_materials = require('./routes/home');

// const login  = require('./routes/login');
// const logout = require('./routes/logout');


//public folder

//app.use('/public', express.static('public'));
// app.use('/api', api) ;
app.use(express.static(__dirname + '/public/uploads'));

//app.use('/materials', materialRouter);

app.use('/uploads', uploadFile);

app.use(registeration);

//app.use(list_materials);

// app.use('/login',login);
// app.use('/logout',logout);







// app.use((req, res, next) => {
//   // Error goes via `next()` method
//   // setImmediate(() => {
//   //     next(new Error('Something went wrong'));
//   // });
// });

//for errors , it will return the status
app.use(function (err, req, res) {
  console.error("you have error is "+err.message);
  if (!err.statusCode) err.statusCode = 500;
  //res.status(err.statusCode).send(err.message);
  console.error("status error code is "+err.statusCode +" "+ err.messag );
 
});








const server = http.createServer(app);

server.listen(8888);