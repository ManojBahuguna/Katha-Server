// IMPORTS
const express = require('express')
const app = express()
const path = require('path')
const { PORT, DB_URL } = require('./config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./models/passport')
const user = require('./routes/user')



// MIDDLEWARES
app.use(
  bodyParser.urlencoded({ extended: false })
)
app.use(bodyParser.json())
app.use(
  session({
    secret: process.env.APP_SECRET || '6PC# 1ID( 0WE$ 761~',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  })
)



// PASSPORT
app.use(passport.initialize())
app.use(passport.session())



// ROUTES
app.use(express.static(path.join(__dirname, 'public')))
app.use('/user', user)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})



// SETUP MONGOOSE
mongoose.connect(DB_URL).then(() => {
  console.log(`Successfully connected to database: ${DB_URL}`)
}).catch(err => {
  console.log(`Error connecting to database: ${err}`)
});



// START SERVER
app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`)
})
