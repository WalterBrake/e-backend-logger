// const express = require('express');
// const path = require('path');
// const logger = require('morgan');

// const app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api', require('./routes/main.routes'));

// module.exports = app;




const express = require('express')
const db = require('./db')

const config = require('./src/config')

const path = require('path');



// Create express instnace
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

//app.use(config.isAuthenticated)

app.use('/api', logs)
app.use('/api', aplications)


module.exports = app;