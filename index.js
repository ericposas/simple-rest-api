// FileName: index.js

// Import express and deps
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// Initialize the app
const app = express()

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// check db connection
if (!db) console.log(`Error connection db`)
else console.log(`db connect success!`)

// Set server port
let port = process.env.PORT || 8080
// Routes
let apiRoutes = require('./api-routes')
// Use the routes
app.use('/api', apiRoutes)
// Send message for default URL
app.get('/', (req, res) => res.send('Express'))
// Launch app to listen to specified port
app.listen(port, () => {
  console.log(`Running RESThub on port ${port}, updated through nodemon`)
})
