const usersController = require('../controllers').users;
const messagesController = require('../controllers').messages;
const User = require('../models').db.User;
const passport = require('passport');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const authenticate = passport.authenticate('jwt', { session: true });

module.exports = (app) => {

    
    app.route('/api/login')
        .post((req, res) => {

            User.findByCredentials(req.body.user.username, req.body.user.password)
                .then(user => {
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

    app.get('/api/users/:userId', authenticate ,usersController.show);
    app.post('/api/users', authenticate, usersController.create);

    app.get('/api/users/:userId/messages', messagesController.index);
    app.post('/api/messages', authenticate, messagesController.create);
    app.get('/api/messages/:messageId', authenticate, messagesController.show);
};