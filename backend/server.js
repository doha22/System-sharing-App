const http = require('http') ;

const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// import express
const express = require('express') ;

const app = express();

// this is middleware
app.use(cors());

// used to parse json
app.use(express.json());

// MONGO CONNECTION
// where env is file has string value connection 

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


//use the files
const materialRouter = require('./routes/material');
//const usersRouter = require('./routes/user');

const UserInfo = require('./routes/user_info');

app.use('/materials', materialRouter);
//app.use('/users', usersRouter);

app.use('/user/info',UserInfo);









const server = http.createServer(app);

server.listen(8000);