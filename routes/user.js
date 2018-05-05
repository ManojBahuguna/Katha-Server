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
    console.error(err)
    res.json({ success: false, msg: 'Failed to Register!' })
  })
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

module.exports = router;