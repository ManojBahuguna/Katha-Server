const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

// STRATEGIES
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    User.findOne({ email }, function (err, user) {
      if (err) return done(err)
      
      if (!user)
        return done(null, false, 'User not found!')

      User.comparePassword(password, user.password).then(isValid => {
        if (isValid)
          return done(null, user, 'Login Successfull!')

        return done(null, false, 'Incorrect password!')
      })
    });
  }
))

module.exports = passport