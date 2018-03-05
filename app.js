var express = require('express');
var session = require("express-session");
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var ejs = require('ejs');
var http = require('http');
var db = require('./server/models');
var socket = require('socket.io');

// Set up the express app
var app = express();

app.set('port', process.env.PORT || 8000);

app.use(session({ 
  secret: "myreallybigsecret",
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
require('./server/routes')(app);
require('./server/config/passport')(passport);

// Setting view engine and Static file directory
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/frontend/static"));

// Setting route for React Frontend
app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/frontend/static/index.ejs'));
});


db.sequelize.sync().then(function() {
    var server = http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });

    var io = socket(server);

    io.on('connection', (socket) => {

      socket.on('SEND_MESSAGE', function(data){
          io.emit('RECEIVE_MESSAGE', data);
      });

      socket.on('SENT_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
      });
    });
});

