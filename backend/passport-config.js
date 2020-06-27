const LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcryptjs');

function initialize(passport, getUserByEmail, getUserById) {

    // authenticateUser fn check from email (to not to repeat) & password by calling
    // note : login will be with : email , password
    const authenticateUser = async (email, password, done) => {

        // calling anther fn and this fn is input of authenticateUser
      const user = getUserByEmail(email)
      if (user == null) {
        return done(null, false, { message: 'No user with that email' })
      }
  
      // compare input password with stored hashed password
      // here is asy fn 
      try {
        if (await bcrypt.compare(password, user.password)) {
            // here user is authenticated 
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        return done(e)
      }
    }  // end of authenticateUser fn 
  
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    // to store inside the session
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
      return done(null, getUserById(id))
    })
  }

  module.exports = initialize ;