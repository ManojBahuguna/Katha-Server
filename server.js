const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080


// Serve public folder
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// Start Server
app.listen(PORT, () => {
	console.log(`Server started at PORT: ${PORT}`)
})
