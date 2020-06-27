const mongoos = require('mongoose');
// create the schema for user 
const Schema = mongoos.Schema ;

// used for using file sys
 //const multer = require("multer");

 const UploadSchema = new Schema({
   // fileUpload:{type: String, data: Buffer , required: true  } ,
   profileImg: { type: String , data: Buffer},
    category_name :{type: String} ,
    description: { type: String },

  
});




const upload = mongoos.model('upload', UploadSchema);




module.exports = upload ;

