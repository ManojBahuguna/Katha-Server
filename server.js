// IMPORTS
const express = require('express')
const app = express()
const path = require('path')
const { PORT, DB_URL } = require('./config')
const mongoose = require('mongoose')



// ROUTES
app.use(express.static(path.join(__dirname, 'public')))
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
