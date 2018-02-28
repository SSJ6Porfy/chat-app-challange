const express = require('express');
const session = require("express-session");
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./server/models');
const path = require('path');
const ejs = require('ejs');
const User = require('./server/models').db.User;

// Set up the express app
const app = express();
app.use(session({ 
  secret: "myreallybigsecret",
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/frontend/static"));

let currentUser;

app.post('/api/login', (req, res) => {

  User.findByCredentials(req.body.user.username, req.body.user.password)
      .then(user => {
          currentUser = JSON.stringify({ id: user.id, username: user.username });
          const token = user.generateToken();
          res.json({ user, token });
      }).catch(() => {
          res
          .status(401)
          .json({ 
              errors: { 
                  validation: {
                      message: 'Invalid username or password'          
                  }
              }
          });
      });
});

const logout = () => { 
  return function (req, res) {
      var returnTo = req.query.returnTo;
      req.logout();
      delete req.session;
      return redir(res, returnTo);
    function redir(res, returnTo) {
      if (returnTo) {
        return res.redirect(returnTo);
      } else {
        return res.send('bye');
      }
    }
  };
};

app.get('/api/logout', logout());

require('./server/routes')(app);
console.log(currentUser);
app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/frontend/static/index.ejs'), { currentUser: currentUser });
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
module.exports = app;