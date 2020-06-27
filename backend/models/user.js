//const mongoos = require('mongoose');
//const bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

const Schema = mongoose.Schema ;

// create the schema for user 

var UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  // should be unique 
    },
    password: {
        type: String,
        required: true,
       // minlength : [4,'Password must be at least 4 character long']
    },
    saltSecret: String
});

// Custom validation for email
// userSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');



// inside password field , store encrypted password. that by using  bcryptjs.



// Events
// userSchema.pre('save', function (next) {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(this.password, salt, (err, hash) => {
//             this.password = hash;
//             this.saltSecret = salt;
//             next();
//         });
//     });
// });







const user = mongoose.model('User', UserSchema);




module.exports = user ;
