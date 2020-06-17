const router = require('express').Router();
let material = require('../models/material');

//router.route(express.static(path.join(__dirname, "./public/")));

// using find() method is from mangoos and return data in json
router.route('/').get((req, res) => {
  material.find()

    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});



// adding user
router.route('/add').post((req, res) => {


 const username = req.body.username ;
 const description = req.body.description;
 const uploading_date = req.body.uploading_date ;
//  const file = new File();
//  file.meta_data = req.body.file;

 //Date.parse(req.body.date);


 
 const newmaterial = new material({
     username,
     description,
     uploading_date,
    // file

    })

    // SET STORAGE
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
 
// var upload = multer({ storage: storage })


// app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send(file)
  
// })

// app.post('/uploadphoto', upload.single('picture'), (req, res) => {
//   var img = fs.readFileSync(req.file.path);
// var encode_image = img.toString('base64');
// // Define a JSONobject for the image attributes for saving to database

// var finalImg = {
//     contentType: req.file.mimetype,
//     image:  new Buffer(encode_image, 'base64')
//  };
// db.collection('quotes').insertOne(finalImg, (err, result) => {
//   console.log(result)

//   if (err) return console.log(err)

//   console.log('saved to database')
//   res.redirect('/')
 
   
// })
// })

// retrive images from db
// app.get('/photos', (req, res) => {
//   db.collection('mycollection').find().toArray((err, result) => {
   
//         const imgArray= result.map(element => element._id);
//               console.log(imgArray);
   
//      if (err) return console.log(err)
//      res.send(imgArray)
   
//     })
//   });



// save the user to db
    newmaterial.save()
      .then(users => res.json('material added successfuly'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;