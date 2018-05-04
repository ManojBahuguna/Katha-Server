const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  username: { type: string, unique: true },
  email: { type: string, required: true, unique: true },
  password: { type: string, required: true },
  firstName: string,
  lastName: string
})

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getById = User.findById;

module.exports.getByEmail = email => User.findOne({ email })

module.exports.getByUsername = username => User.findOne({ username })

module.exports.add = user => bcrypt.genSalt().then(salt =>
  bcrypt.hash(user.password, salt).then(hashedPassword =>
    new User({
      email: user.email,
      password: hashedPassword
    }).save()
  )
)

module.exports.comparePassword = bcrypt.compare