const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const db = require('./server/models');
var path = require('path');
const ejs = require('ejs');

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

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/frontend/static"));

require('./server/routes')(app);
app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/frontend/static/index.ejs'));
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
module.exports = app;