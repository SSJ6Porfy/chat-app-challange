const usersController = require('../controllers').users;
const messagesController = require('../controllers').messages;
const chatroomsController = require('../controllers').chatrooms;
const passport = require('passport');
const User = require('../models').User;

const authenticate = passport.authenticate('jwt', { session: true });

module.exports = (app) => {

app.post('/api/login', (req, res) => {

  User.findByCredentials(req.body.user.username, req.body.user.password)
      .then(user => {
            const token = user.generateToken();

            res.json({ id:       user.id, 
                        username: user.username, 
                        token:     token
                    });
                     
      }).catch(() => {
          res
          .status(401)
          .json({ 
              errors: { message: 'Invalid username or password' }
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

    app.post('/api/users', isLoggedIn, usersController.create);
    app.get('/api/logout', logout());
    app.get('/api/users/:userId',  isLoggedIn ,usersController.show);
    
    app.get('/api/users/:userId/messages', isLoggedIn ,messagesController.index);
    app.post('/api/messages',isLoggedIn , messagesController.create);
    app.get('/api/messages/:messageId',isLoggedIn , messagesController.show);

    app.get('/api/users/:userId/chatrooms', isLoggedIn ,chatroomsController.index);
    app.post('/api/chatrooms',isLoggedIn , chatroomsController.create);
    app.get('/api/chatrooms',isLoggedIn , chatroomsController.show);
    app.get('/api/chatrooms/:chatroomId/notification', isLoggedIn, chatroomsController.notification);
};

let isLoggedIn = (req, res, next) => {
    console.log(req.user, req);
    if (req.sessionID) {
        next();
    } else {
        res.status(401).json({ 
                            errors: { message: "Must be logged in" }
                        });
    }
};