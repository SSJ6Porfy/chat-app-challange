const usersController = require('../controllers').users;
const messagesController = require('../controllers').messages;
const passport = require('passport');

const authenticate = passport.authenticate('jwt', { session: true });

module.exports = (app) => {
    app.get('/api/users/:userId', authenticate ,usersController.show);
    app.post('/api/users', authenticate, usersController.create);
    app.get('/api/users/:userId/messages', messagesController.index);
    app.post('/api/messages', authenticate, messagesController.create);
    app.get('/api/messages/:messageId', authenticate, messagesController.show);
};