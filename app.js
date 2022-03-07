
const express = require('express')

//bd conection
const db = require('./db')
//get authentication function
const config = require('./src/middlewares/auth')

const path = require('path');

// Create express instance
const app = express()

app.use(express.static(path.join(__dirname, 'public')));

// Init body-parser options (inbuilt with express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require & Import API routes
const logs = require('./src/routes/logs')
const aplications = require('./src/routes/aplications')
const authorization = require('./src/routes/authorizations')

// Use API Routes
app.use('/api', authorization)

//Verify token authentication **this allow to create an autenthication token first and then create logs or aplications records
app.use(config.isAuthenticated)

app.use('/api', logs)
app.use('/api', aplications)


module.exports = app;