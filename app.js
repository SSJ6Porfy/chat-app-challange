const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./server/models/user');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies in the browser
app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret: 'asappcodingchallenge',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));


require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;