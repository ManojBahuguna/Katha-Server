const express = require('express');
const router = express.Router();
const passport = require('../models/passport');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
  User.add({
    email: req.body.email,
    password: req.body.password
  }).then(user => {
    res.json({ success: true, msg: 'Successfully Registered!', user })
  }).catch(err => {
    if (err.code === 11000)
      return res.json({ success: false, msg: 'Email already exists! Please Login.' })
    res.json({ success: false, msg: 'Failed to Register!' })
  })
});

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user, message) => {
    if (err)
      res.status(400).json({ success: false, message: err })
    else if (!user)
      res.status(401).json({ success: false, message })
    else
      res.json({ success: true, user, message })
  })(req, res)
})

router.post('/logout', (req, res) => {
  req.logout()
  res.json({ success: true, message: 'Successfully logged out!' })
})

module.exports = router;