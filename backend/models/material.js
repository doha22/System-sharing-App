const mongoos = require('mongoose');
// create the schema for user 
const Schema = mongoos.Schema ;

// used for using file sys
 const multer = require("multer");

const materialSchema = new Schema({

    username: { type: String, required: true },
  description: { type: String, required: true },
  uploading_date: { type: Date, required: true , default: Date.now },
  
 
  // meta_data:{}
}, {
  timestamps: true,

});


//middle ware in serial
// to use current date of uploaded material 
// materialSchema.pre('save', function preSave(next){
//     var current_date = this;
//     this.uploading_date(Date.now());
//     next();
//   });

const material = mongoos.model('material', materialSchema);

// for uploading file
// const storage = multer.diskStorage({
//   destination: "./public/",
//   filename: function(req, file, cb){
//      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
// }).single("myfile");

// const obj =(req,res) => {
//   upload(req, res, () => {
//      console.log("Request ---", req.body);
//      console.log("Request file ---", req.file);//Here you get file.
//      const file = new File();
//      file.meta_data = req.file;
//      file.save().then(()=>{
//      res.send({message:"uploaded successfully"})
//      })
//      /*Now do where ever you want to do*/
//   });
// }



module.exports = material ;

