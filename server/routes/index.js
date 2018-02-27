const usersController = require('../controllers').users;
const messagesController = require('../controllers').messages;
const User = require('../models/user');

module.exports = (app) => {

  app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
  });

  var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/api/main');
    } else {
        next();
    }    
  };


  // route for Home-Page
//   app.get('/', sessionChecker, (req, res) => {
//     res.redirect('/api/login');
//   });

  app.route('/api/login')
    .get(sessionChecker, (req, res) => res.status(200).send({
      message: 'Welcome to the Login Page',
    }))
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/api/login');
            } else if (!user.authenticate(password)) {
                res.redirect('/api/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/api/main');
            }
        });
    });

//   app.get('/', (req, res) => res.status(200).send({
//     message: 'Welcome to the Chat App API!',
//   }));

  app.get('/api/users/:userId', usersController.show);
  app.post('/api/users', usersController.create);

  app.get('/api/users/:userId/messages', messagesController.index);
  app.post('/api/messages', messagesController.create);
  app.get('/api/messages/:messageId', messagesController.show);
};