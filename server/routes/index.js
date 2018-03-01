const usersController = require('../controllers').users;
const messagesController = require('../controllers').messages;
const passport = require('passport');
const User = require('../models').db.User;

const authenticate = passport.authenticate('jwt', { session: true });

module.exports = (app) => {

app.post('/api/login', (req, res) => {

  User.findByCredentials(req.body.user.username, req.body.user.password)
      .then(user => {
          const token = user.generateToken();
          res.json({ id: user.id, username: user.username, token: user.sessionToken });
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
    app.get('/api/users/:userId', authenticate ,usersController.show);
    app.post('/api/users', authenticate, usersController.create);
    app.get('/api/users/:userId/messages', messagesController.index);
    app.post('/api/messages', authenticate, messagesController.create);
    app.get('/api/messages/:messageId', authenticate, messagesController.show);
};